import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('fcv')
@ApiTags('fcv')
export class FcvController {
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getResults() {}
}
