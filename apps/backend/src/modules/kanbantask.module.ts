import { Module } from '@nestjs/common';
import { KanbantaskController } from '../controllers/kanbantask.controller';
import { KanbanTaskService } from '../services/kanbantask.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [KanbantaskController],
  providers: [KanbanTaskService, PrismaService],
})
export class KanbanTaskModule {}
