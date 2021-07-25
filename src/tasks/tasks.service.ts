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
    let task = this.getTaskById(id);
    task = { id, ...updateTaskDto };
    return task;
  }

  updateTaskStatusById(id: string, status: TasksStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
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
