import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function configSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('User Galery API')
    .setDescription('API do user galery')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  configSwagger(app);
  await app.listen(3331);
}

bootstrap();
