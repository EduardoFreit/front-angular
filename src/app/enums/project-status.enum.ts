export enum ProjectStatusEnum {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const ProjectStatusLabels: Record<ProjectStatusEnum, string> = {
  [ProjectStatusEnum.PLANNING]: 'Planejamento',
  [ProjectStatusEnum.IN_PROGRESS]: 'Em Progresso',
  [ProjectStatusEnum.COMPLETED]: 'Concluído',
  [ProjectStatusEnum.CANCELLED]: 'Cancelado',
};
