import { ProjectStatusEnum } from '../enums/project-status.enum';

export interface ProjectRequestDto {
  name: string;
  description?: string;
  status: ProjectStatusEnum;
  startDate: string;
  endDate?: string;
}
