/* eslint-disable prettier/prettier */
import { TasksStatus } from '../task.model';

export class CreateTaskDto {
  title: string;
  description: string;
}
export class UpdateTaskDto {
  title: string;
  description: string;
  status: TasksStatus;
}
