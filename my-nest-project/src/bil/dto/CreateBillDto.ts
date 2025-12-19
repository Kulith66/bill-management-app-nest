import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBillDto {
  
  @IsNotEmpty()
  @IsString()
  invoice: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;   // Use string for incoming request (ISO date)

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;
}
