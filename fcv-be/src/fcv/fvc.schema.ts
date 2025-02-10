import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type FcvDocument = HydratedDocument<Fcv>;

@Schema()
export class Fcv {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const FcvSchema = SchemaFactory.createForClass(Fcv);
