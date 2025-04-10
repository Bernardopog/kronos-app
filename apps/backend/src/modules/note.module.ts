import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService],
})
export class NoteModule {}
