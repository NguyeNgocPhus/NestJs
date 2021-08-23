import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create_task.dto';
import { Task } from './tasks.entity';
import { taskStatus } from './tasks.status-enum';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, desc } = createTaskDto;
    const task = await this.create({
      title,
      desc,
      status: taskStatus.DONE,
    });
    await this.save(task);

    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
