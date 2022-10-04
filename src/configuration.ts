import { Configuration, App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as jwt from '@midwayjs/jwt';
import * as redis from '@midwayjs/redis';
import { join } from 'path';
import { ILifeCycle, MidwayDecoratorService } from '@midwayjs/core';
import { registerDecorator } from './decorator/registerDecorator';
import { registerFilter } from './filter/registerFilter';
import { registerMiddleware } from './middleware/registerMiddleware';

@Configuration({
  imports: [koa, validate, jwt, redis],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady() {
    // middleware
    registerMiddleware(this.app);
    // filter
    registerFilter(this.app);
    // decorator
    registerDecorator(this.decoratorService);
  }
}
