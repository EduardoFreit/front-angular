import { ProjectStatusEnum } from '../enums/project-status.enum';

export interface DashboardGeneralMetricsDto {
  totalProjects: number;
  totalDevelopers: number;
  totalDevelopersAllocated: number;
  projectsByStatus: Record<ProjectStatusEnum, number>;
}
