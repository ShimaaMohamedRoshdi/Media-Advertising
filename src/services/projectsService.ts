import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types/project';
import { INITIAL_PROJECTS } from '../data/initialProjects';

const LOCAL_STORAGE_KEY = 'media_advertising_projects_v2';

const getLocalProjects = (): Project[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_PROJECTS;
  }
};

const saveLocalProjects = (projects: Project[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
};

export const projectsService = {
  async getProjects(): Promise<{ data: Project[]; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { data: getLocalProjects(), error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return { data: getLocalProjects(), error: null };
      }

      return { data: data as Project[], error: null };
    } catch {
      return { data: getLocalProjects(), error: null };
    }
  },

  async getProjectById(id: string): Promise<{ data: Project | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const project = getLocalProjects().find((p) => p.id === id) || null;
      return { data: project, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        const fallback = getLocalProjects().find((p) => p.id === id) || null;
        return { data: fallback, error: null };
      }

      return { data: data as Project, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch project' };
    }
  },

  async createProject(input: CreateProjectInput): Promise<{ data: Project | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalProjects();
      const newProj: Project = {
        ...input,
        id: 'proj-' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      saveLocalProjects([newProj, ...local]);
      return { data: newProj, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('projects')
        .insert([input])
        .select()
        .single();

      if (error) {
        const local = getLocalProjects();
        const newProj: Project = {
          ...input,
          id: 'proj-' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        saveLocalProjects([newProj, ...local]);
        return { data: newProj, error: null };
      }

      return { data: data as Project, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to create project' };
    }
  },

  async updateProject(id: string, updates: UpdateProjectInput): Promise<{ data: Project | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalProjects();
      const index = local.findIndex((p) => p.id === id);
      if (index === -1) return { data: null, error: 'Project not found' };

      const updatedProj: Project = {
        ...local[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      local[index] = updatedProj;
      saveLocalProjects(local);
      return { data: updatedProj, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as Project, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to update project' };
    }
  },

  async deleteProject(id: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalProjects();
      const filtered = local.filter((p) => p.id !== id);
      saveLocalProjects(filtered);
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase as any)
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        const local = getLocalProjects();
        saveLocalProjects(local.filter((p) => p.id !== id));
        return { success: true, error: null };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete project' };
    }
  }
};
