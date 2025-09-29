import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('utils')
export class UtilsController {
  @ApiOperation({
    summary: 'asdf',
  })
  @Get('aac')
  getAAC_Code() {
    return {};
  }

  @Get('crm')
  getCRMCode() {
    return {};
  }

  @Get('knockout')
  validateKnockout() {
    return {};
  }
}
