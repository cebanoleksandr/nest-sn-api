import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_NOT_FOUND_ERROR } from './users.constants';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR)
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: AuthDto) {
    const user = await this.usersService.create(dto);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR)
    }
    
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(id, dto);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR)
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR)
    }

    return user;
  }
}
