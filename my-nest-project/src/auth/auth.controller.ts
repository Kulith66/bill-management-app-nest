import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}


@Post('signup')
async signup(@Body() createUserDto: CreateUserDto) {
const user = await this.authService.create(createUserDto);
const { password, ...safe } = user.toObject();
return safe;
}



@Post('login')
async login(@Body() loginDto: LoginUserDto) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.password);
  if (!user) throw new UnauthorizedException('Invalid credentials');
  return this.authService.login(user);
}

@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
return req.user;
}
}