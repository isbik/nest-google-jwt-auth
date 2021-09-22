import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { GoogleStrategy } from '../strategies/google.strategy';
import { UserModule } from '../user/user.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [GoogleController],
  providers: [GoogleService, ConfigService, GoogleStrategy],
})
export class GoogleModule {}
