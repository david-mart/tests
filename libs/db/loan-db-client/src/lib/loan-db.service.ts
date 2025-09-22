import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@delos/prisma/loan-db';

@Injectable()
export class LoanDbService extends PrismaClient implements OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }
}
