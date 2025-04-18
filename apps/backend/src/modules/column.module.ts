import { Module } from '@nestjs/common';
import { ColumnController } from '../controllers/column.controller';
import { ColumnService } from '../services/column.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, PrismaService],
})
export class ColumnModule {}
