import { FcvTestTypes } from './fcv.enum';

export interface FcvResults {
  test_type: FcvTestTypes;
  is_successful: boolean;
  confidence: number | null;
  error_reason: string | null;
  created_at: Date;
}
