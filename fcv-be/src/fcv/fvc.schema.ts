import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { StoredFile } from '../storage/storage.interface';
import { User } from '../user/user.schema';
import { FcvTestTypes } from './fcv.enum';
import { FcvResults } from './fcv.interface';

export type FcvDocument = HydratedDocument<Fcv>;

@Schema()
export class Fcv {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: User;

  @Prop(
    raw({
      path: { type: String },
    }),
  )
  cough_sample: StoredFile;

  @Prop([{ type: String, enum: FcvTestTypes }])
  test_types: FcvTestTypes[];

  @Prop(
    raw([
      {
        test_type: { type: String, enum: FcvTestTypes },
        is_successful: { type: Boolean },
        confidence: { type: Number },
        error_reason: { type: String },
        created_at: { type: Date },
      },
    ]),
  )
  results: FcvResults[];

  @Prop({ type: Date, default: Date.now })
  created_at?: Date;
}

export const FcvSchema = SchemaFactory.createForClass(Fcv);
