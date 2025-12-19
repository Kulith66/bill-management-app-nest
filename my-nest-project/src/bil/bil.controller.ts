import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bil.service';
import { CreateBillDto } from './dto/CreateBillDto';
import { UpdateBillDto } from './dto/updatebillDto';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  // Create Bill
  @Post('')
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  // Get all Bills
  @Get()
  findAll() {
    return this.billService.findAll();
  }

  // Get one Bill by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  // Update Bill
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(id, updateBillDto);
  }

  // Delete Bill
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
//calculate all amount
