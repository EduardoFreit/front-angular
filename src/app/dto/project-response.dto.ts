import { ProjectStatusEnum } from "../enums/project-status.enum";

export interface ProjectResponseDto {
  id: number;
  name: string;
  description: string;
  status: ProjectStatusEnum;
  startDate: string;
  endDate: string;
}
