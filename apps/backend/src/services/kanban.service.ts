import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AddUserToKanbanDTO,
  CreateKanbanDTO,
  RemoveUserFromKanbanDTO,
  SetUserRoleDTO,
  UpdateKanbanDTO,
} from 'src/dto/kanban.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KanbanService {
  constructor(private readonly prismaService: PrismaService) {}

  async getKanbans(userId: string) {
    return await this.prismaService.kanban.findMany({ where: { userId } });
  }

  async getKanbanFull(id: string, userId: string) {
    const kanban = await this.prismaService.kanban.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { createAt: 'asc' },
          include: {
            tasks: {
              omit: {
                completionDate: true,
                description: true,
              },
            },
          },
          omit: { createAt: true, userId: true },
        },
        user: { select: { username: true, displayName: true } },
        authorizedUsers: {
          select: {
            userId: true,
            role: true,
            user: { select: { username: true, displayName: true } },
          },
        },
      },
    });

    if (
      !kanban?.authorizedUsers.some((user) => user.userId === userId) &&
      kanban?.userId !== userId
    )
      throw new HttpException(
        'Usuário não autorizado',
        HttpStatus.UNAUTHORIZED,
      );

    return kanban;
  }

  async createKanban(userId: string, data: CreateKanbanDTO) {
    return await this.prismaService.kanban.create({
      data: { ...data, userId },
    });
  }
  async renameKanban(id: string, data: UpdateKanbanDTO) {
    return await this.prismaService.kanban.update({
      where: { id },
      data,
    });
  }
  async deleteKanban(id: string) {
    const columns = await this.prismaService.column.findMany({
      where: { kanbanId: id },
    });
    const columnIds = columns.map((column) => column.id);
    await this.prismaService.kanbanTask.deleteMany({
      where: { columnId: { in: columnIds } },
    });
    await this.prismaService.column.deleteMany({ where: { kanbanId: id } });
    await this.prismaService.authorizedUser.deleteMany({
      where: { kanbanId: id },
    });

    return await this.prismaService.kanban.delete({ where: { id } });
  }

  async getAuthorizedKanbans(userId: string) {
    return await this.prismaService.kanban.findMany({
      where: { authorizedUsers: { some: { userId } } },
      include: { authorizedUsers: { select: { userId: true, role: true } } },
    });
  }

  async getAuthorizedKanban(userId: string, kanbanId: string) {
    return await this.prismaService.authorizedUser.findFirst({
      where: { userId, kanbanId },
    });
  }

  async addUserToKanban(data: AddUserToKanbanDTO) {
    const kanban = await this.prismaService.kanban.findFirst({
      where: { id: data.kanbanId },
      include: { authorizedUsers: { select: { userId: true } } },
    });
    if (!kanban)
      throw new HttpException('Kanban não encontrado', HttpStatus.NOT_FOUND);

    const user = await this.prismaService.user.findFirst({
      where: { id: data.userId },
    });
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    if (
      kanban.authorizedUsers.some((user) => user.userId === data.userId) ||
      kanban.userId === data.userId
    )
      throw new HttpException(
        'Usuário já adicionado ao Kanban',
        HttpStatus.BAD_REQUEST,
      );

    return await this.prismaService.authorizedUser.create({
      data: { ...data, role: 'read' },
      include: { user: { select: { username: true, displayName: true } } },
    });
  }

  async removeUserFromKanban(data: RemoveUserFromKanbanDTO) {
    const authorizedKanban = await this.prismaService.authorizedUser.findFirst({
      where: { kanbanId: data.kanbanId, userId: data.userId },
    });
    if (!authorizedKanban)
      throw new HttpException(
        'Usuário não encontrado no Kanban',
        HttpStatus.NOT_FOUND,
      );

    return await this.prismaService.authorizedUser.delete({
      where: { id: authorizedKanban?.id },
    });
  }

  async setUserRole(data: SetUserRoleDTO) {
    const authorizedKanban = await this.prismaService.authorizedUser.findFirst({
      where: { kanbanId: data.kanbanId, userId: data.userId },
    });
    if (!authorizedKanban)
      throw new HttpException(
        'Usuário não encontrado no Kanban',
        HttpStatus.NOT_FOUND,
      );

    return await this.prismaService.authorizedUser.update({
      where: { id: authorizedKanban?.id },
      data: { role: data.role },
    });
  }
}
