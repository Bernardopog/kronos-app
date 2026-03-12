import { Module } from '@nestjs/common';
import { KeepaliveController } from '../controllers/keepalive.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [KeepaliveController],
  providers: [PrismaService],
  imports: [ConfigModule.forRoot()],
})
export class KeepaliveModule {}
