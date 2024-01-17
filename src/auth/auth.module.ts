import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [UserService, AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, UserModule],
})
export class AuthModule {}
