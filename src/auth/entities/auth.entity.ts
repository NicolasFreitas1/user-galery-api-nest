export class AuthEntity {
  /**
   * Id do usuário.
   */
  userId: number;
  /**
   * Nome do usuário autenticado.
   */
  username: string;

  /**
   * JWT válido com as especificações e acessos do usuário logado.
   */
  token: string;
}
