import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UserInfo } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserEntity } from 'src/user/entities/user.entity';
import { ImageService } from './image.service';

@Controller('image')
@ApiTags('Image')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @UserInfo() userInfo: UserEntity,
  ) {
    return this.imageService.create(file, userInfo);
  }

  @Get('byUser')
  async findAll(@UserInfo() userInfo: UserEntity) {
    const images = await this.imageService.findAll(userInfo);

    return images;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }

  @Delete(':id')
  remove(
    @UserInfo() currentUser: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.imageService.remove(id, currentUser);
  }
}
