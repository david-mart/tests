import { Controller, Get, Inject } from '@nestjs/common';

import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  @Inject(HealthService)
  private readonly healthService: HealthService;

  @Get()
  getHealth() {
    return this.healthService.getHealth();
  }
}
