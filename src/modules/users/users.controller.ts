import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserRequestDTO } from './dto/createUserRequest.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserRequestDTO): Promise<any> {
    return await this.userService.createUser(body);
  }

}
