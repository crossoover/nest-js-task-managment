/* eslint-disable prettier/prettier */
import { TasksStatus } from '../task.model';
import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  status: TasksStatus;
}
