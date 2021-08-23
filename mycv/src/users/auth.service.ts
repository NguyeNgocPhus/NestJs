import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);

    if (user.length) {
      throw new BadRequestException('email in use');
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);
    const user1 = await this.userService.create(email, hash);

    return user1;
  }
  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('sai');
    }
    return user;
  }
}
