import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImageController],
  providers: [PrismaService, ImageService],
})
export class ImageModule {}
