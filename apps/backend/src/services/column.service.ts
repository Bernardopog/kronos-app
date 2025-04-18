import { Injectable } from '@nestjs/common';
import {
  CreateColumnDTO,
  RenameColumnDTO,
  UpdateColumnDTO,
} from 'src/dto/column.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(private readonly prismaService: PrismaService) {}

  async getColumns(kanbanId: string) {
    const columns = await this.prismaService.column.findMany({
      where: { kanbanId },
      omit: { userId: true, createAt: true, kanbanId: true },
      include: { tasks: { select: { id: true, columnId: true } } },
      orderBy: { createAt: 'asc' },
    });
    return columns.map((column) => ({
      ...column,
      tasks: column.tasks.map((task) => task.id),
    }));
  }
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
  async renameColumn(id: string, data: RenameColumnDTO) {
    return this.prismaService.column.update({
      where: { id },
      data,
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
