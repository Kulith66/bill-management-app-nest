import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateBillDto {
  
  @IsOptional()
  @IsString()
  invoice?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;
}
