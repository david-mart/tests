import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [HealthModule, OffersModule],
  providers: [],
})
export class AppModule {}
