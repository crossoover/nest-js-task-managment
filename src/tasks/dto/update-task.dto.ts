/* eslint-disable prettier/prettier */
import { TasksStatus } from '../task-status.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  status: TasksStatus;
}
