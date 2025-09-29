import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { OffersModule } from './offers/offers.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [HealthModule, OffersModule, UtilsModule],
  providers: [],
})
export class AppModule {}
