import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks.filter((item) => item.id !== id);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
    const index: number = this.tasks.findIndex((item) => item.id === id);
    return (this.tasks[index] = { id, ...updateTaskDto });
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
