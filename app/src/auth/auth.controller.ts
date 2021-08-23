import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  createUser(@Body() user: AuthUserDto): Promise<{ token: string }> {
    return this.authService.signUp(user);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    // console.log(email);

    return this.authService.signIn(email, password);
  }
}
