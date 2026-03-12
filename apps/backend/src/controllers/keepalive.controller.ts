import {
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('keepalive')
export class KeepaliveController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async keepalive(@Headers('authorization') authHeader: string) {
    try {
      const cronSecret = process.env.CRON_SECRET;
      const expectedToken = `Bearer ${cronSecret}`;

      if (!authHeader || authHeader !== expectedToken) {
        throw new UnauthorizedException('Invalid/Missing Token');
      }
      const date = new Date();
      console.log(`(Keep Alive): ${date.toLocaleString()}`);

      await this.prismaService.$queryRaw`SELECT 1;`;
      return { message: 'Supabase is alive' };
    } catch (err) {
      console.error('Error in (Keepalive)', err);
      throw new InternalServerErrorException('Database check failed');
    }
  }
}
