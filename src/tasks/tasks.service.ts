import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksByFilters(filterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((item) => item.status === status);
    }

    if (search) {
      tasks = tasks.filter((item) => {
        if (item.title.includes(search) || item.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((item) => item.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" does not exist.`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks.filter((item) => item.id !== found.id);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;
    const task = this.getTaskById(id);
    task.title = title;
    task.description = description;
    task.status = status;
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
