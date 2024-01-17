import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './guards';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  signIn(@Body() loginUserDto: LoginDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Get('validateToken')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  validateToken(): string {
    return 'OK';
  }
}
