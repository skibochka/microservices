import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(process.env.USER_SERVICE_NAME) private readonly client: ClientProxy,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data) {
    const emailExist = this.client.send('GET_USER_BY_EMAIL', {
      email: data.email,
    });
    if (emailExist) {
      throw new BadRequestException('User with such email have already exists');
    }

    const saltRounds = this.configService.get('application.saltRounds');
    data.password = await hash(data.password, saltRounds);

    const user = await firstValueFrom<any>(this.client.send('CREATE', data));

    if (user) {
      return {
        accessToken: this.jwtService.sign({
          id: user.id,
          email: user.email,
          username: user.username,
        }),
      };
    }

    throw new BadRequestException();
  }

  async signIn(data) {
    return {
      accessToken: this.jwtService.sign({
        id: data.id,
        email: data.email,
        username: data.username,
      }),
    };
  }

  async getUserByEmail(email: string) {
    return firstValueFrom(this.client.send('GET_USER_BY_EMAIL', { email }));
  }
}
