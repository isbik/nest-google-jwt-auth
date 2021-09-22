import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isCorrectPassword = compare(password, user.password);

    if (!isCorrectPassword) throw new UnauthorizedException();

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login({ id, email }) {
    const payload = { id, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
