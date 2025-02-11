import { ApiProperty } from "@nestjs/swagger";
import { FcvTestTypes } from './fcv.enum'
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class PostFcvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ type: 'string', enum: FcvTestTypes })
  @IsEnum(FcvTestTypes)
  test_type: FcvTestTypes;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  user_id: string
}
