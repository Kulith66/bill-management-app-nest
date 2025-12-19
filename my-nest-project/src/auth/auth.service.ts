import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {
constructor(
@InjectModel(User.name) private userModel: Model<User>,
private jwtService: JwtService,
) {}


async create(createUserDto: CreateUserDto) {
const { email, password, name } = createUserDto;
const existing = await this.userModel.findOne({ email }).exec();
if (existing) throw new UnauthorizedException('Email already in use');


const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);
const created = new this.userModel({ email, password: hash, name });
return created.save();
}


async validateUser(email: string, pass: string) {
const user = await this.userModel.findOne({ email }).exec();
if (!user) return null;
const matched = await bcrypt.compare(pass, user.password);
if (matched) {
// exclude password
const { password, ...result } = user.toObject();
return result;
}
return null;
}


async login(user: any) {
const payload = { email: user.email, sub: user._id };
return {
access_token: this.jwtService.sign(payload),
};
}
}