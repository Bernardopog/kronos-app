import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
