import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create_task.dto';
import { getTaskFilterDto } from './dto/get_task.dto';
import { Task } from './tasks.entity';

@Controller('task')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get()
  // getTask(@Query() IsNotEmpty: getTaskFilterDto): TasksModel[] {
  //   if(IsNotEmpty) {
  //     throw new NotFoundException('khong tim thay gi nay')
  //   }

  //   const a = this.tasksService.getTask();
  //   return a;
  // }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): TasksModel {
  //   const a = this.tasksService.getTaskById(id);
  //   return a;
  // }
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto) {
    console.log(CreateTaskDto);

    const data = this.tasksService.createTask(CreateTaskDto);
    return data;
  }
}
