import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * Login do usuário.
   * @example admin
   */
  @IsNotEmpty()
  @MinLength(5)
  login: string;

  /**
   * Senha do usuário.
   * @example Admin12345
   */
  @IsNotEmpty()
  password: string;
}
