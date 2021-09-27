import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../$core/decorators/auth-user.decorator';
import { IAuthUser } from '../$core/types/AuthUser';
import { UserService } from '../user/user.service';
import { AuthGuard } from './../$core/guards/jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: LoginDto) {
    const oldUser = await this.userService.findUserByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User email alread register');

    return this.userService.create(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.validateUser(email, password);

    return this.authService.login({ id: user.id, email: user.email });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@AuthUser() user: IAuthUser) {
    return this.userService.findUserByEmail(user.email);
  }
}
