import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ login, password }: LoginDto) {
    const user = await this.userService.findByLogin(login);
    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches)
      throw new NotFoundException(null, 'User or password wrong');

    return {
      userId: user.id,
      username: user.name,
      token: await this.signUserToken(user.login),
    };
  }

  signUserToken(login: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        login,
      },
      {
        expiresIn: '12h',
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );
  }

  createHashedUserPermissions(userPermissions: object): Promise<string> {
    return this.jwtService.signAsync(userPermissions, {
      secret: Buffer.from(
        'a754c8724a6a9cf67a7831aa1d7e8e3cdf1c86bd32b72749f044664a940eda09',
        'base64',
      ),
    });
  }
}
