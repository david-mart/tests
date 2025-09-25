import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@delos/prisma/loan-db';

@Injectable()
export class LoanDbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
