import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './pay.service';
import { PaymentController } from './pay.controller';
import { Payment, PaymentSchema } from '../auth/schemas/pay.schema';
import { Bill, BillSchema } from '../auth/schemas/bil.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Bill.name, schema: BillSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
