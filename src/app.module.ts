import './polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppConfigService } from './shared/services/app-config.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';

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
    RedisModule.forRootAsync(
      {
        useFactory: (configService: AppConfigService) => {
          return {
            readyLog: true,
            config: configService.redisConfig,
          };
        },
        inject: [AppConfigService],
      },
      true,
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        return configService.typeormConfig;
      },
      inject: [AppConfigService],
    }),
    SharedModule,
    // business module
    UserModule,
    SystemModule,
  ],
})
export class AppModule {}
