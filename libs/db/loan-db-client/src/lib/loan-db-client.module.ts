import { Module } from '@nestjs/common';
import { LoanDbService } from './loan-db.service';

@Module({
  controllers: [],
  providers: [LoanDbService],
  exports: [],
})
export class LoanDbClientModule {}
