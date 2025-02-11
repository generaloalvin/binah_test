import { Module } from '@nestjs/common';
import { Fcv, FcvSchema } from './fvc.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FcvController } from './fcv.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FcvService } from './fcv.service';
import { FcvModel } from './fcv.model';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fcv.name, schema: FcvSchema }]),
    AuthModule,
    UserModule,
    AiModule,
  ],
  controllers: [FcvController],
  providers: [FcvService, FcvModel],
})
export class FcvModule {}
