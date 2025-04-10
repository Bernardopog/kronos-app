import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTags(userId: string) {
    return await this.prismaService.tag.findMany({ where: { userId } });
  }
  async createTag(userId: string, data) {
    return await this.prismaService.tag.create({ data: { ...data, userId } });
  }

  async deleteTag(id: string) {
    await this.prismaService.noteTag.deleteMany({ where: { tagId: id } });

    return await this.prismaService.tag.delete({ where: { id } });
  }
}
