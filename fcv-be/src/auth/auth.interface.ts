import { Types } from 'mongoose';

export interface AuthLoginResponse {
  success: boolean;
  token?: string;
}

export interface JwtPayload {
  _id: Types.ObjectId;
  email: string;
}
