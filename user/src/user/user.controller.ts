import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CREATE,
  GET_USER_BY_EMAIL,
  ICreateUserInput,
  IGetUserInput,
} from '../../../shared-lib/lib';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(CREATE)
  async create(body: ICreateUserInput) {
    return this.userService.create(body);
  }

  @MessagePattern(GET_USER_BY_EMAIL)
  async getUserByEmail(body: IGetUserInput) {
    return this.userService.getUserByEmail(body.email);
  }
}
