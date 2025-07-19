import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @Get()
  async users() {
    return this.userService.users();
  }
}
