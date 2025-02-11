import { ApiProperty } from '@nestjs/swagger';

export class PostFcvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ type: 'string' })
  // Comma-Separated test_types
  test_type: string;
}
