import { apiClient } from '@/lib/apiClient';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  dueDate?: string;
  members?: { user: { name: string; avatar?: string } }[];
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignee?: { id: string; name: string; avatar?: string };
  createdBy?: { id: string; name: string };
  comments?: { id: string; content: string; user: { name: string } }[];
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  dueDate?: string;
  clientId?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: string;
  assigneeId?: string;
}

export const projectsApi = {
  listProjects: (): Promise<Project[]> =>
    apiClient.get('/projects') as unknown as Promise<Project[]>,

  getProjectDetails: (id: string): Promise<Project> =>
    apiClient.get(`/projects/${id}`) as unknown as Promise<Project>,

  createProject: (dto: CreateProjectDto): Promise<Project> =>
    apiClient.post('/projects', dto) as unknown as Promise<Project>,

  createTask: (projectId: string, dto: CreateTaskDto): Promise<Task> =>
    apiClient.post(`/projects/${projectId}/tasks`, dto) as unknown as Promise<Task>,

  listProjectTasks: (projectId: string): Promise<Task[]> =>
    apiClient.get(`/projects/${projectId}/tasks`) as unknown as Promise<Task[]>,

  updateTaskStatus: (taskId: string, status: string): Promise<Task> =>
    apiClient.patch(`/projects/tasks/${taskId}/status?status=${status}`) as unknown as Promise<Task>,

  addTaskComment: (taskId: string, content: string): Promise<void> =>
    apiClient.post(`/projects/tasks/${taskId}/comments`, { content }) as unknown as Promise<void>,
};
