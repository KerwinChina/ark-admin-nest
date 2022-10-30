import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SysPermMenuItemRespDto } from './permmenu.dto';
import { SystemPermMenuService } from './permmenu.service';
import { wrapResponse } from '/@/common/utils/swagger';
import { AuthUser } from '/@/decorators/auth-user.decorator';
import { ApiSecurityAuth } from '/@/decorators/swagger.decorator';

@ApiTags('System permission and menu - 系统权限及菜单')
@ApiSecurityAuth()
@Controller('perm/menu')
export class SystemPermMenuController {
  constructor(private pmService: SystemPermMenuService) {}

  @Get('list')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysPermMenuItemRespDto,
      struct: 'list',
    }),
  })
  async list(@AuthUser('uid') uid: number) {
    return await this.pmService.getPermMenuByList(uid);
  }
}
