import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  ParseIntPipe,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserInfo } from 'src/auth/decorators/user-info';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.userService.updateUser(id, updateUserDto, currentUser);
  }
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() currentUser: UserEntity,
  ) {
    return this.userService.deleteUser(id, currentUser);
  }
}
