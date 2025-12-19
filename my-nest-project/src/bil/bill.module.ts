import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillController } from './bil.controller';
import { BillService } from './bil.service';
import { BillSchema , Bill } from '../auth/schemas/bil.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bill.name, schema:BillSchema },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService], // optional
})
export class BillModule {}
