import { Module } from '@nestjs/common';
import { Fcv, FcvSchema } from './fvc.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fcv.name, schema: FcvSchema }])],
})
export class FcvModule {}
