import { taskStatus } from '../tasks.status-enum';
export interface getTaskFilterDto {
  search?: string;
  status?: taskStatus;
}
