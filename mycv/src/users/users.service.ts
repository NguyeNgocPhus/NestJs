import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }
  async findOne(id: number) {
    return this.repo.findOne(id);
  }
  async find(email: string) {
    return await this.repo.find({ email });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('ko tim thay');
    }
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('khong tim thay');
    }
    return await this.repo.save(user);
  }
}
