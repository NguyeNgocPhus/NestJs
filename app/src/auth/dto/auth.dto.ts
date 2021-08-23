import { IsEmail, IsString, Matches } from 'class-validator';

export class AuthUserDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsEmail()
  email: string;
}
