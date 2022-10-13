import './polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppConfigService } from './shared/services/app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        return {
          readyLog: true,
          config: configService.redisConfig,
        };
      },
      inject: [AppConfigService],
    }),
    SharedModule,
  ],
  providers: [],
})
export class AppModule {}
