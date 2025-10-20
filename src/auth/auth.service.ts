import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, USER_WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    const baseUser = {
      firstName: '',
      lastName: '',
      photoUrl: '',
      gender: '',
      username: '',
      isPrivate: false,
      coverPhotoUrl: '',
      bio: '',
      location: { city: '', country: '' },
      dateOfBirth: new Date(),
      contacts: { email: '', phone: '', website: '' },
    };
    return await this.usersService.create({ login: dto.login, password: passwordHash, ...baseUser });
  }

  async findUser(email: string) {
    return this.usersService.getUserByEmail(email);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isValidPassword = await compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException(USER_WRONG_PASSWORD_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
