import { Image } from '@prisma/client';

export class ImageEntity implements Image {
  /**
   * Id da Companhia
   */
  id: number;
  /**
   * Id do usuário relacionado
   */
  userId: number;
  /**
   * Nome da imagem
   */
  name: string;
  /**
   * Extensão da imagem
   */
  extension: string;
  /**
   * Nome salvo da imagem
   */
  nmStored: string;
  /**
   * Tamanho da imagem
   */
  vlSize: number;
  /**
   * Data de criação
   */
  createdAt: Date;

  data?: string;

  constructor(partial: Partial<ImageEntity>) {
    Object.assign(this, partial);
  }
}
