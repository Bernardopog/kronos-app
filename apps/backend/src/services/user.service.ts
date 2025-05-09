import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateDisplayName(id: string, displayName: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { displayName: displayName },
      omit: { password: true },
    });
  }
}
