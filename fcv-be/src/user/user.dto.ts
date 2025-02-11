/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from './user.schema';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  password: string;
}

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  static from(user: User): UserDto {
    const userDto = new UserDto();
    userDto.name = user.name;
    userDto.email = user.email;
    return userDto;
  }
}
