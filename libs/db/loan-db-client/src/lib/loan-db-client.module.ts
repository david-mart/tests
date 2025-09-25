import { Global, Module } from '@nestjs/common';

import { LoanDbService } from './loan-db.service';

@Global()
@Module({
  controllers: [],
  providers: [LoanDbService],
  exports: [LoanDbService],
})
export class LoanDbClientModule {}
