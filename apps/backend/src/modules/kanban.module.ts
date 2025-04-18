import { Module } from '@nestjs/common';
import { KanbanController } from '../controllers/kanban.controller';
import { KanbanService } from '../services/kanban.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KanbanController],
  providers: [KanbanService, PrismaService],
})
export class KanbanModule {}
