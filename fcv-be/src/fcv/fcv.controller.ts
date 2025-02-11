import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetFcvQueryDto, PostFcvDto } from './fcv.dto';
import { FcvService } from './fcv.service';
import { Request } from 'express';
import { UserDto } from '../user/user.dto';
import { FcvTestTypes } from './fcv.enum';

@Controller('fcv')
@ApiTags('fcv')
export class FcvController {
  constructor(private readonly fcvService: FcvService) {}

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
      body.test_type.split(',').map((t) => t.trim()),
      request.user._id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getResults(
    @Query() query: GetFcvQueryDto,
    @Req() request: Request & { user: UserDto },
  ) {
    return {
      data: await this.fcvService.getResults(
        request.user._id,
        query.test_type as FcvTestTypes,
      ),
    };
  }
}
