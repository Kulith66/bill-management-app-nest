import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {
@IsEmail()
email: string;


@IsNotEmpty()
@MinLength(6)
password: string;

@IsOptional()
@IsString()
name: string;

}