import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillSchema } from '../auth/schemas/bil.schema';
import { CreateBillDto } from './dto/CreateBillDto';
import { UpdateBillDto } from './dto/updatebillDto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<Bill>,
  ) {}

  // Create new Bill
  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const newBill = new this.billModel(createBillDto);
    return newBill.save();
  }

  // Get all Bills
  async findAll(): Promise<Bill[]> {
    return this.billModel.find().sort({ createdAt: -1 }).exec();
  }

  // Get a single Bill by ID
  async findOne(id: string): Promise<Bill> {
    const bill = await this.billModel.findById(id).exec();
    if (!bill) {
      throw new NotFoundException(`Bill with ID "${id}" not found`);
    }
    return bill;
  }

  // Update a Bill
  async update(id: string, updateBillDto: UpdateBillDto): Promise<Bill> {
    const updatedBill = await this.billModel
      .findByIdAndUpdate(id, updateBillDto, { new: true })
      .exec();

    if (!updatedBill) {
      throw new NotFoundException(`Bill with ID "${id}" not found`);
    }

    return updatedBill;
  }

  // Delete a Bill
  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.billModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Bill with ID "${id}" not found`);
    }

    return { message: 'Bill deleted successfully' };
  }
}
