import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data) {
    return this.userRepository.save(data);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
