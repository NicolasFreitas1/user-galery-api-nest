import { User } from '@prisma/client';

export class UserEntity implements User {
  /**
   * Id do usuário
   */
  id: number;
  /**
   * Nome do usuário
   */
  name: string;
  /**
   * Login do usuário
   */
  login: string;
  /**
   * Senha do usuário
   */
  password: string;
  /**
   * Data de criação do usuário
   */
  createdAt: Date;
  /**
   * Data de atualização do usuário
   */
  updatedAt: Date;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
