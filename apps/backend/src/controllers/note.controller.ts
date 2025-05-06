import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Param,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { NoteService } from '../services/note.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(@Req() req) {
    const userId = req['user'].id as string;
    return await this.noteService.getNotes(userId);
  }

  @Get(':id')
  async getSpecificNote(@Param('id') id: string) {
    return await this.noteService.getSpecificNote(id);
  }

  @Post()
  async createNote(@Req() req) {
    const userId = req['user'].id as string;
    return await this.noteService.createNote(userId);
  }

  @Patch('content/:id')
  async changeNoteContent(
    @Param('id') id: string,
    @Body() body: { content: string },
  ) {
    return await this.noteService.changeContent(id, body.content);
  }

  @Post('tag')
  async addTagToNote(@Body() body: { noteId: string; tagId: string }) {
    return await this.noteService.addTagToNote(body.noteId, body.tagId);
  }

  @Delete('tag')
  async removeTagFromNote(@Body() body: { noteId: string; tagId: string }) {
    return await this.noteService.removeTagFromNote(body.noteId, body.tagId);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return await this.noteService.deleteNote(id);
  }
}
