import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FcvModule } from './fcv/fcv.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/local',
    ),
    UserModule,
    FcvModule,
    AuthModule,
    StorageModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
