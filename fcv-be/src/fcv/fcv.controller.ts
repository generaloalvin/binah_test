import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFcvDto } from './fcv.dto';

@Controller('fcv')
@ApiTags('fcv')
export class FcvController {

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: PostFcvDto,
  })
  async postResults(@UploadedFile() file: Express.Multer.File, @Body() body: PostFcvDto) {
    console.log(file);
    console.log(body);
  }
}
