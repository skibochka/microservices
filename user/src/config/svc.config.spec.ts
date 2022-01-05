import { Test } from '@nestjs/testing';
import { SvcConfigService } from './svc.config.service';
import { ConfigModule } from '@nestjs/config';
import { SvcConfigModule } from './svc.config.module';

describe('UserController', () => {
  let configService: SvcConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, SvcConfigModule],
      providers: [SvcConfigService],
    }).compile();

    configService = moduleRef.get<SvcConfigService>(SvcConfigService);
  });

  describe('Get config', () => {
    it('Should return service name', async () => {
      const result = 'user';

      expect(await configService.get('service.name')).toEqual(result);
    });
  });
});
