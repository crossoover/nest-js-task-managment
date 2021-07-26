import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksByFilters(filterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((item) => {
  //       if (item.title.includes(search) || item.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" does not exist.`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks.filter((item) => item.id !== found.id);
  // }
  // updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const { title, description, status } = updateTaskDto;
  //   const task = this.getTaskById(id);
  //   task.title = title;
  //   task.description = description;
  //   task.status = status;
  //   return task;
  // }
  // updateTaskStatusById(
  //   id: string,
  //   updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const task = this.getTaskById(id);
  //   task.status = updateTaskStatusDto.status;
  //   return task;
  // }
}
