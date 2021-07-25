import { Delete, Put } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }
}
