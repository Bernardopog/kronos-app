import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  findNote = async (id: string) => {
    const task = await this.prismaService.note.findUnique({ where: { id } });
    if (!task)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    return task;
  };

  async getNotes(userId: string) {
    const note = await this.prismaService.note.findMany({
      where: { userId },
      orderBy: { creationDate: 'asc' },
      include: {
        tags: true,
      },
    });
    const formattedNote = note.map((item) => ({
      ...item,
      tags: item.tags.map((tag) => tag.tagId),
    }));
    return formattedNote;
  }

  async getSpecificNote(id: string) {
    const note = await this.prismaService.note.findFirst({
      where: { id },
      include: {
        tags: true,
      },
    });
    const formattedNote = {
      ...note,
      tags: note?.tags.map((item) => item.tagId),
    };
    return formattedNote;
  }

  async createNote(userId: string) {
    const blankNote = {
      title: 'Nova Nota',
      userId,
    };

    return await this.prismaService.note.create({ data: blankNote });
  }
  async toggleFavorite(id: string) {
    const note = await this.findNote(id);
    const formattedNote = await this.prismaService.note.update({
      where: { id },
      data: { isFavorite: !note.isFavorite },
      include: {
        tags: true,
      },
      omit: {
        creationDate: true,
        updateDate: true,
        userId: true,
        description: true,
        icon: true,
        title: true,
      },
    });
    return {
      ...formattedNote,
      tags: formattedNote?.tags.map((item) => item.tagId),
    };
  }

  async changeIcon(id: string, icon: string) {
    const note = await this.prismaService.note.update({
      where: { id },
      data: { icon, updateDate: new Date() },
      include: {
        tags: true,
      },
      omit: {
        creationDate: true,
        updateDate: true,
        userId: true,
        description: true,
        isFavorite: true,
        title: true,
      },
    });
    return {
      ...note,
      tags: note?.tags.map((item) => item.tagId),
    };
  }

  async renameNote(id: string, title: string) {
    const note = await this.prismaService.note.update({
      where: { id },
      data: { title, updateDate: new Date() },
      include: {
        tags: true,
      },
      omit: {
        creationDate: true,
        updateDate: true,
        userId: true,
        description: true,
        isFavorite: true,
        icon: true,
      },
    });
    return {
      ...note,
      tags: note?.tags.map((item) => item.tagId),
    };
  }

  async changeContent(id: string, content: string) {
    const note = await this.prismaService.note.update({
      where: { id },
      data: { description: content, updateDate: new Date() },
      include: {
        tags: true,
      },
    });
    return {
      ...note,
      tags: note?.tags.map((item) => item.tagId),
    };
  }

  async deleteNote(id: string) {
    await this.prismaService.noteTag.deleteMany({
      where: { noteId: id },
    });

    return await this.prismaService.note.delete({ where: { id } });
  }

  async addTagToNote(noteId: string, tagId: string) {
    return await this.prismaService.noteTag.create({ data: { noteId, tagId } });
  }

  async removeTagFromNote(noteId: string, tagId: string) {
    return await this.prismaService.noteTag.deleteMany({
      where: { noteId, tagId },
    });
  }
}
