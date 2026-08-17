import { useState, useEffect, useCallback } from 'react';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types/project';
import { projectsService } from '../services/projectsService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await projectsService.getProjects();
    if (result.error) {
      setError(result.error);
    } else {
      setProjects(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (input: CreateProjectInput) => {
    const result = await projectsService.createProject(input);
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data) {
      setProjects((prev) => [result.data!, ...prev]);
    }
    return result.data;
  };

  const updateProject = async (id: string, updates: UpdateProjectInput) => {
    const result = await projectsService.updateProject(id, updates);
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data) {
      setProjects((prev) => prev.map((p) => (p.id === id ? result.data! : p)));
    }
    return result.data;
  };

  const deleteProject = async (id: string) => {
    const result = await projectsService.deleteProject(id);
    if (result.error) {
      throw new Error(result.error);
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  return {
    projects,
    isLoading,
    error,
    refresh: fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
}
