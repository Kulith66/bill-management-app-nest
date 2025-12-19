import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Bill', required: true })
  bill: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
