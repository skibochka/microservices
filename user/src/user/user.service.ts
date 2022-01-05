import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ICreateUserInput } from '../../../shared-lib/lib';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: ICreateUserInput) {
    return this.userRepository.save(data);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
