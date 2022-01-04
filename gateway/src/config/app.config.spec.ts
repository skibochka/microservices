import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { AppConfigModule } from './app.config.module';

describe('UserController', () => {
  let configService: AppConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, AppConfigModule],
      providers: [AppConfigService],
    }).compile();

    configService = moduleRef.get<AppConfigService>(AppConfigService);
  });

  describe('Get config', () => {
    it('Should return application port', async () => {
      const result = '3000';

      expect(await configService.get('application.port')).toEqual(result);
    });
  });
});
