import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ImageEntity } from './entities/image.entity';
import * as path from 'node:path';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File, userInfo: UserEntity) {
    const userId = userInfo.id;

    const { originalname, filename, size, mimetype } = file;

    const image = await this.prisma.image.create({
      data: {
        userId: userId,
        name: originalname,
        nmStored: filename,
        vlSize: size,
        extension: mimetype,
      },
    });

    return image;
  }

  async findAll(userInfo: UserEntity) {
    const images = await this.prisma.image.findMany({
      where: {
        userId: userInfo.id,
      },
    });

    return images.map(this.convertImage);
  }

  async findOne(id: number) {
    const image = await this.prisma.image.findUnique({
      where: {
        id,
      },
    });
    return this.convertImage(image);
  }

  async remove(id: number, userInfo: UserEntity) {
    const image = await this.prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (image.userId !== userInfo.id) {
      throw new BadRequestException(
        'You cannot remove images from another user',
      );
    }

    fs.rm(`${path.join('./uploads')}/${image.nmStored}`, (e) => {
      if (e) {
        console.log(e);
        throw new NotFoundException(e.message);
      }
    });

    return this.prisma.image.delete({
      where: {
        id,
      },
    });
  }

  private convertImage(image: ImageEntity): ImageEntity {
    try {
      const folderPath = `${path.join('./uploads')}/${image.nmStored}`; // Entra na pasta '/uploads' e procura o nome salvo da imagem

      const b64Image = fs.readFileSync(folderPath, { encoding: 'base64' }); // Transforma em base64 aquela única imagem
      const objectImage = { ...image, data: b64Image }; // Cria um objeto da imagem, com os dados dela e o base64

      return objectImage;
    } catch (error) {
      if (error.message.includes('no such file or directory, open')) {
        throw new NotFoundException(
          null,
          `Image not found in folder: ${error.path}`,
        );
      }
      throw new NotFoundException(null, `Image not found, ${error}`);
    }
  }
}
