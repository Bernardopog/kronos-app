import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('tag')
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(@Req() req) {
    const userId = req['user'].id as string;
    return await this.tagService.getTags(userId);
  }

  @Post()
  async createTag(@Req() req, @Body() body) {
    const userId = req['user'].id as string;
    return await this.tagService.createTag(userId, body);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string) {
    const res = await this.tagService.deleteTag(id);
    return res;
  }
}
