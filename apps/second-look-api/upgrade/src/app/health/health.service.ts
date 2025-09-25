import { Inject, Injectable } from '@nestjs/common';

import { LoanDbService } from '@delos/db/loan';

@Injectable()
export class HealthService {
  @Inject(LoanDbService)
  private readonly loanDbService: LoanDbService;

  async getHealth() {
    await this.loanDbService.$queryRaw`SELECT 1`;
    return { status: 'OK' };
  }
}
