import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  port: process.env['APP_PORT'],
  saltRounds: +process.env['SALT_ROUNDS'],
  jwtOptions: {
    secret: process.env['JWT_SECRET'],
    options: {
      expiresIn: +process.env['JWT_EXPIRES_IN'],
    },
  },
}));
