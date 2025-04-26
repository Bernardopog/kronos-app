import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateKanbanTaskDTO,
  MoveKanbanTaskDTO,
  UpdateKanbanTaskDTO,
} from 'src/dto/kanbantask.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KanbanTaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSpecificKanbanTask(id: string) {
    return await this.prismaService.kanbanTask.findFirst({
      where: { id },
    });
  }

  async createKanbanTask(data: CreateKanbanTaskDTO) {
    return await this.prismaService.kanbanTask.create({
      data: { ...data },
    });
  }

  async updateKanbanTask(id: string, data: UpdateKanbanTaskDTO) {
    return await this.prismaService.kanbanTask.update({ where: { id }, data });
  }

  async moveKanbanTaskToColumn(id: string, data: MoveKanbanTaskDTO) {
    return await this.prismaService.kanbanTask.update({ where: { id }, data });
  }

  async completeKanbanTask(id: string) {
    const kanbanTask = await this.prismaService.kanbanTask.findFirst({
      where: { id },
    });

    if (!kanbanTask)
      throw new HttpException('Tarefa nao encontrada', HttpStatus.NOT_FOUND);

    kanbanTask.isCompleted = !kanbanTask.isCompleted;
    return await this.prismaService.kanbanTask.update({
      where: { id },
      data: kanbanTask,
    });
  }

  async deleteKanbanTask(id: string) {
    return await this.prismaService.kanbanTask.delete({
      where: { id },
      omit: {
        description: true,
        completionDate: true,
        creationDate: true,
        isCompleted: true,
        priority: true,
        team: true,
      },
    });
  }
}
