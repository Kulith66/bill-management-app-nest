import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Bill {
  @Prop({ required: true, unique: true })
  invoice: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop()
  description: string;

  @Prop()
  totalAmount?: number;
}

// This is the correct document type
export type BillDocument = Bill & Document;

export const BillSchema = SchemaFactory.createForClass(Bill);
