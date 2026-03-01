import { SkillDto } from './skill.dto';

export interface DeveloperResponseDto {
  id: number;
  name: string;
  email: string;
  skills: SkillDto[];
}
