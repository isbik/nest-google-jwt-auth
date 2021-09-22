import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findUserByEmail(dto.email);

    if (oldUser) throw new BadRequestException();

    return this.userService.create(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const user = await this.authService.validateUser(email, password);

    return this.authService.login({ id: user.id, email: user.email });
  }
}
