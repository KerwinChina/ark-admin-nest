import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SysUserPageItemRespDto, SysUserPageReqDto } from './user.dto';
import { SystemUserService } from './user.service';
import { wrapResponse } from '/@/common/utils/swagger';
import { AuthUser } from '/@/decorators/auth-user.decorator';
import { ApiSecurityAuth } from '/@/decorators/swagger.decorator';

@ApiTags('System user - 系统用户')
@ApiSecurityAuth()
@Controller('user')
export class SystemUserController {
  constructor(private userService: SystemUserService) {}

  @Get('page')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysUserPageItemRespDto,
      struct: 'page',
    }),
  })
  async page(@Query() query: SysUserPageReqDto, @AuthUser('uid') uid: number) {
    return await this.userService.getUserByPage(
      query.page,
      query.limit,
      query.deptId,
      uid,
    );
  }
}
