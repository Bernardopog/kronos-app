import { Module } from '@nestjs/common';
import { TagController } from '../controllers/tag.controller';
import { TagService } from '../services/tag.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService],
})
export class TagModule {}
