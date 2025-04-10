import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategories(userId: string) {
    return await this.prismaService.category.findMany({ where: { userId } });
  }

  async createCategory(userId: string, data) {
    return await this.prismaService.category.create({
      data: { ...data, userId },
    });
  }

  async renameCategory(id: string, data) {
    return await this.prismaService.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return await this.prismaService.category.delete({ where: { id } });
  }
}
