import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: AuthUserDto): Promise<{ token: string }> {
    const { name, password, email } = user;

    const satl = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, satl);
    const data = this.create({ name, password: hashPassword, email });
    try {
      const a = await this.save(data);

      return { token: 'suucess' };
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('loi cmm roi');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
