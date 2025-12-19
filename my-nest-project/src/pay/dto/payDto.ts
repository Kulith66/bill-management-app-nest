import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  billId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
