import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BillModule } from './bil/bill.module';
import { PaymentModule } from './pay/pay.module';


@Module({
imports: [
MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://kulith:kulith@cluster0.scuci69.mongodb.net/?appName=Cluster0'),
AuthModule,BillModule,PaymentModule,
],
})
export class AppModule {}