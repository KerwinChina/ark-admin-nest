import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserLoginCaptchaDto, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
import { AllowAnonPermission } from '/@/decorators/allow-anon-permission.decorator';
import { AuthUser } from '/@/decorators/auth-user.decorator';
import { Ip, Uri } from '/@/decorators/http.decorator';
import { SkipAuth } from '/@/decorators/skip-auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('login/captcha')
  @SkipAuth()
  async loginCaptcha(@Query() query: UserLoginCaptchaDto) {
    return await this.userService.createLoginCaptcha(query.width, query.height);
  }

  @Post('login')
  @SkipAuth()
  async login(
    @Body() body: UserLoginDto,
    @Ip() ip: string,
    @Uri() uri: string,
  ) {
    return await this.userService.createLoginToken(body, ip, uri);
  }

  @Get('permmenu')
  @AllowAnonPermission()
  async permmenu(@AuthUser('uid') uid: number) {
    return await this.userService.getUserPermMenu(uid);
  }
}
