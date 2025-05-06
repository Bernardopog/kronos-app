import { Module } from '@nestjs/common';
import { KanbanController } from '../controllers/kanban.controller';
import { KanbanService } from '../services/kanban.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColumnService } from 'src/services/column.service';
import { KanbanTaskService } from 'src/services/kanbantask.service';
import { KanbanGateway } from 'src/gateway/kanban.gateway';

@Module({
  controllers: [KanbanController],
  providers: [
    KanbanService,
    ColumnService,
    KanbanTaskService,
    KanbanGateway,
    PrismaService,
  ],
})
export class KanbanModule {}
