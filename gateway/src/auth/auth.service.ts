import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { IUser } from '../interfaces/user/user.interface';
import { IJWTPayload } from '../interfaces/user/jwtPayload.interfaces';
import { ICreateUserInput } from '../interfaces/user/createUser.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(process.env.USER_SERVICE_NAME) private readonly client: ClientProxy,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: ICreateUserInput) {
    const emailExist = await this.client
      .send('GET_USER_BY_EMAIL', {
        email: data.email,
      })
      .toPromise();
    if (emailExist) {
      throw new BadRequestException('User with such email have already exists');
    }

    const saltRounds = this.configService.get('application.saltRounds');
    data.password = await hash(data.password, saltRounds);

    const user = await firstValueFrom<IUser>(this.client.send('CREATE', data));

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

  async signIn(data: IJWTPayload) {
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
