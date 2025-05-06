import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';
import { PrismaService } from '../prisma/prisma.service';
import { NoteGateway } from 'src/gateway/note.gateway';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteGateway, PrismaService],
})
export class NoteModule {}
