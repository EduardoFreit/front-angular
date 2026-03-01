export interface AllocationRequestDto {
  developerId: number;
  projectId: number;
  startDate: string;
  endDate: string;
  active?: boolean;
}
