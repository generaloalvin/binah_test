import { ApiProperty } from '@nestjs/swagger';
import { FcvTestTypes } from './fcv.enum';
import { IsEnum } from 'class-validator';
import { FcvResults } from './fcv.interface';

export class PostFcvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ type: 'string' })
  // Comma-Separated test_types
  test_type: string;
}

export class GetFcvQueryDto {
  @ApiProperty({ type: 'string', enum: FcvTestTypes })
  @IsEnum(FcvTestTypes)
  test_type: string;
}

export class FcvResultsDto {
  @ApiProperty({ nullable: true, type: Number })
  confidence: number | null;

  @ApiProperty({ nullable: true, type: String })
  error_reason: string | null;

  @ApiProperty({ enum: FcvTestTypes })
  test_type: FcvTestTypes;

  @ApiProperty()
  is_successful: boolean;

  @ApiProperty()
  created_at: Date;

  static fromFcvResults(results: FcvResults): FcvResultsDto {
    const dto = new FcvResultsDto();
    dto.confidence = results.confidence;
    dto.error_reason = results.error_reason;
    dto.test_type = results.test_type;
    dto.is_successful = results.is_successful;
    dto.created_at = results.created_at;

    return dto;
  }
}
