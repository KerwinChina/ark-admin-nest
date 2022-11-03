import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from './services/app-config.service';
import { AppGeneralService } from './services/app-general.service';

const providers = [AppConfigService, AppGeneralService];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => configService.jwtConfig,
      inject: [AppConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
