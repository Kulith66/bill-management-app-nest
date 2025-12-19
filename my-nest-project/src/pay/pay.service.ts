import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../auth/schemas/pay.schema';
import { CreatePaymentDto } from './dto/payDto';
import { Bill } from '../auth/schemas/bil.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Bill.name) private billModel: Model<Bill>
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    const bill = await this.billModel.findById(dto.billId);
    if (!bill) throw new NotFoundException('Bill not found');

    if (bill.totalAmount! < dto.amount)
      throw new Error('Payment amount exceeds bill total');

    // Reduce bill total amount
    bill.totalAmount = bill.totalAmount! - dto.amount;
    await bill.save();

    // Save payment
    const payment = new this.paymentModel({
      bill: dto.billId,
      amount: dto.amount,
    });
    return payment.save();
  }

  async getPaymentsByBill(billId: string) {
    return this.paymentModel.find({ bill: billId }).sort({ date: -1 });
  }
}
