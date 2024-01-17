import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Nome do usuário
   * @example admin
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  /**
   *  Login do usuário
   *  @example admin
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  login: string;
}
