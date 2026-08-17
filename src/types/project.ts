export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  category: string;
  optional_details?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type CreateProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type UpdateProjectInput = Partial<CreateProjectInput>;
