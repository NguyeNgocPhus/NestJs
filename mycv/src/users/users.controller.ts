import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Session,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';

import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator.ts/current-user.decorator';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDto } from './dto/user-dto';
import { CurrentUserInper } from './interceptor/current-user.interceptor';

import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private UserService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/me')
  @UseInterceptors(CurrentUserInper)
  @Serialize(UserDto)
  async checkMe(@CurrentUser() data: any) {
    return data;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @UseInterceptors(CurrentUserInper)
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  @Serialize(UserDto)
  async findUser(@Param('id') id: string, @Session() session: any) {
    console.log(session.userId);

    const user = await this.UserService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.UserService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.UserService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.UserService.update(parseInt(id), body);
  }
}
