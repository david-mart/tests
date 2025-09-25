import { Module } from '@nestjs/common';

import { LoanDbClientModule } from '@delos/db/loan';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [LoanDbClientModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
