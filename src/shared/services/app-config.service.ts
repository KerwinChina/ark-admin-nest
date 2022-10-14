import type { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import type { JwtModuleOptions } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' environment variable is not a boolean');
    }
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      globalPrefix: this.getString('GLOBAL_PREFIX'),
    };
  }

  get redisConfig(): RedisClientOptions {
    return {
      keyPrefix: `${this.appConfig.globalPrefix}:`,
      host: this.getString('REDIS_HOST'),
      port: this.getNumber('REDIS_PORT'),
      password: this.getString('REDIS_PASSWORD'),
      db: this.getNumber('REDIS_DB'),
    };
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      secret: this.getString('JWT_SECRET'),
    };
  }

  /**
   * internal function
   */
  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }
    return value;
  }
}
