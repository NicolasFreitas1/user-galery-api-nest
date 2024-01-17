import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * Nome do usuário.
   * @example admin
   */
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  /**
   * Login do usuário.
   * @example admin
   */
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  login: string;

  /**
   * Senha fornecida pelo usuário. Deve conter: de 8 à 30 caracteres, letra maiúsculas e minusculas.
   * @example Admin12345
   */
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,30}$/gm)
  password: string;
}
