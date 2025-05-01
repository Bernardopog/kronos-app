import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoTaskDTO, UpdateTodoTaskDTO } from '../dto/todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  findTask = async (id: string) => {
    const task = await this.prismaService.todo.findUnique({ where: { id } });
    if (!task)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    return task;
  };

  async getTaskList(userId: string) {
    return await this.prismaService.todo.findMany({ where: { userId } });
  }

  async createTask(data: CreateTodoTaskDTO, userId: string) {
    const dataWithUser = { ...data, userId };
    return await this.prismaService.todo.create({ data: dataWithUser });
  }

  async toggleTask(id: string) {
    const task = await this.findTask(id);
    return await this.prismaService.todo.update({
      where: { id: task.id },
      data: { isCompleted: !task.isCompleted },
      omit: {
        categoryId: true,
        creationDate: true,
        description: true,
        priority: true,
        title: true,
        userId: true,
      },
    });
  }

  async updateTask(id: string, data: UpdateTodoTaskDTO) {
    const task = await this.findTask(id);
    const formattedData = {
      ...task,
      ...data,
      categoryId: data.categoryId === '' ? null : data.categoryId,
    };

    return await this.prismaService.todo.update({
      where: { id },
      data: formattedData,
    });
  }

  async deleteMany(query: 'all' | 'completed' | 'uncompleted', userId: string) {
    if (query === 'all')
      return await this.prismaService.todo.deleteMany({ where: { userId } });
    else if (query === 'completed')
      return await this.prismaService.todo.deleteMany({
        where: { userId, isCompleted: true },
      });
    else if (query === 'uncompleted')
      return await this.prismaService.todo.deleteMany({
        where: { userId, isCompleted: false },
      });
  }

  async deleteSpecific(id: string) {
    await this.findTask(id);
    return await this.prismaService.todo.delete({ where: { id } });
  }
}
