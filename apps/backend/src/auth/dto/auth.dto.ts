import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignInDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(48)
  password: string;

  @IsEmail()
  email: string;
}

export class SignUpDTO extends SignInDTO {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName: string;
}
