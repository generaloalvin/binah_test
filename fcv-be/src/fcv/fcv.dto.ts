import { ApiProperty } from '@nestjs/swagger';
import { FcvTestTypes } from './fcv.enum';
import { IsEnum } from 'class-validator';

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
