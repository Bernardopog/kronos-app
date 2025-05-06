import { Injectable } from '@nestjs/common';
import { CreateColumnDTO, UpdateColumnDTO } from 'src/dto/column.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(private readonly prismaService: PrismaService) {}

  async createColumn(userId: string, data: CreateColumnDTO) {
    return this.prismaService.column.create({
      data: { ...data, userId },
      omit: { createAt: true },
    });
  }
  async updateColumn(id: string, data: UpdateColumnDTO) {
    return this.prismaService.column.update({
      where: { id },
      data,
      omit: { createAt: true },
    });
  }
  async renameColumn(id: string, columnName: string) {
    return this.prismaService.column.update({
      where: { id },
      data: { columnName },
      omit: { createAt: true },
    });
  }
  async deleteColumn(id: string) {
    const tasks = await this.prismaService.kanbanTask.findMany({
      where: { columnId: id },
    });

    const taskIds = tasks.map((task) => task.id);
    await this.prismaService.kanbanTask.deleteMany({
      where: { id: { in: taskIds } },
    });

    return this.prismaService.column.delete({
      where: { id },
      omit: { color: true, createAt: true, icon: true, userId: true },
    });
  }
}
