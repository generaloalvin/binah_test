import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFcvDto } from './fcv.dto';
import { FcvService } from './fcv.service';
import { Request } from 'express';
import { UserDto } from '../user/user.dto';

@Controller('fcv')
@ApiTags('fcv')
export class FcvController {
  constructor(private readonly fcvService: FcvService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: PostFcvDto,
  })
  async postResults(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: PostFcvDto,
    @Req() request: Request & { user: UserDto },
  ) {
    await this.fcvService.processCoughSample(
      file,
      body.test_type.split(',').map(t => t.trim()),
      request.user._id,
    );
  }
}
