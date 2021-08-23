import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    protected jwtService: JwtService,
  ) {}

  async signUp(user: AuthUserDto): Promise<{ token: string }> {
    return this.usersRepository.createUser(user);
  }
  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.jwtService.sign({ id: user.id });

      return { token: token };
    } else {
      throw new UnauthorizedException('dang nhap cho chuan vao');
    }
  }
}
