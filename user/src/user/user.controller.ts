import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ICreateUserInput } from '../interfaces/createUser.interface';
import { IGetUserInput } from '../interfaces/getUser.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('CREATE')
  async create(body: ICreateUserInput) {
    return this.userService.create(body);
  }

  @MessagePattern('GET_USER_BY_EMAIL')
  async getUserByEmail(body: IGetUserInput) {
    return this.userService.getUserByEmail(body.email);
  }
}
