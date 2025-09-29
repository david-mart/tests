import { Body, Controller, Get, Headers } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

import {
  GetOffersRequestDto,
  GetOffersResponseDto,
} from './dto/get-offers.dto';

@Controller('offers')
export class OffersController {
  @ApiHeader({
    name: 'program',
    description: `A combination of the same values provided in the request body fields:
  - _applicationInformation.assetType_
  - _applicationInformation.expandedProgramSegment_
  - _applicationInformation.channel_ (only \`CREDIT_KARMA\` and \`DIRECT_MAIL_CUSTOM\` in \`FIRST_LOOK\` )
  - applicationInformation.expandedProgramSubSegment (only \`AUTO_REFI\` in \`FIRST_LOOK\` )

  The formula will be : \`assetType-expandedProgramSegment_channel-expandedProgramSubSegment\`

  Allows investors to implement some infra-level routing based on assetType,
  segments and channel without having to parse the request body`,
    schema: {
      type: 'string',
      enum: [
        'LOAN-TRADITIONAL',
        'LOAN-FIRST_LOOK',
        'LOAN-FIRST_LOOK_CREDIT_KARMA',
        'LOAN-FIRST_LOOK_DIRECT_MAIL_CUSTOM',
        'LOAN-FIRST_LOOK-AUTO_REFI',
        'LOAN-FIRST_LOOK_CREDIT_KARMA-AUTO_REFI',
        'MASTER_LINE-FIRST_LOOK',
        'MASTER_LINE-FIRST_LOOK_CREDIT_KARMA',
        'MASTER_LINE-TRADITIONAL',
      ],
    },
  })
  @ApiHeader({
    name: 'request-type',
    schema: {
      type: 'string',
      enum: ['SCORING', 'ALLOCATION', 'INCOME_VERIFICATION'],
      description: `- _SCORING_ - use when the request is made to score offers
  - _ALLOCATION_ - use when the request is made for allocation purposes
  - _INCOME_VERIFICATION_ - use when the request is made for income
  verification purposes`,
    },
  })
  /**
   * Create some resource
   */
  @Get('')
  async offers(
    @Headers('program') program: string,
    @Headers('request-type') requestType: string,
    @Body() body: GetOffersRequestDto
  ): Promise<GetOffersResponseDto> {
    return {} as GetOffersResponseDto;
  }
}
