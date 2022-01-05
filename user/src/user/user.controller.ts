import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('CREATE')
  async create(body) {
    return this.userService.create(body);
  }

  @MessagePattern('GET_USER_BY_EMAIL')
  async getUserByEmail(body) {
    return this.userService.getUserByEmail(body.email);
  }
}
