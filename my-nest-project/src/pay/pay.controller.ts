import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './pay.service';
import { CreatePaymentDto } from './dto/payDto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('')
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Get(':billId')
  getByBill(@Param('billId') billId: string) {
    return this.paymentService.getPaymentsByBill(billId);
  }
}
