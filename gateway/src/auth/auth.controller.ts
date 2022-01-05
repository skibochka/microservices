import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserInputDto } from '../../../shared-lib/lib';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: CreateUserInputDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
