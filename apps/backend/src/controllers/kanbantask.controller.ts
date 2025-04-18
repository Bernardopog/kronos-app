import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateKanbanTaskDTO,
  MoveKanbanTaskDTO,
  UpdateKanbanTaskDTO,
} from 'src/dto/kanbantask.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { KanbanTaskService } from '../services/kanbantask.service';

@Controller('kanbantask')
@UseGuards(AuthGuard)
export class KanbantaskController {
  constructor(private readonly kanbanTaskService: KanbanTaskService) {}

  @Get()
  async getKanbanTasks(@Req() req: Request) {
    const userId = req['user'].id as string;
    return await this.kanbanTaskService.getKanbanTasks(userId);
  }

  @Get(':id')
  async getSpecificKanbanTask(@Param('id') id: string) {
    return await this.kanbanTaskService.getSpecificKanbanTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createKanbanTask(
    @Req() req: Request,
    @Body() body: CreateKanbanTaskDTO,
  ) {
    const userId = req['user'].id as string;
    return await this.kanbanTaskService.createKanbanTask(userId, body);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async updateKanbanTask(
    @Param('id') id: string,
    @Body() body: UpdateKanbanTaskDTO,
  ) {
    return await this.kanbanTaskService.updateKanbanTask(id, body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async moveKanbanTaskToColumn(
    @Param('id') id: string,
    @Body() body: MoveKanbanTaskDTO,
  ) {
    return await this.kanbanTaskService.moveKanbanTaskToColumn(id, body);
  }

  @Patch('/complete/:id')
  async completeKanbanTask(@Param('id') id: string) {
    return await this.kanbanTaskService.completeKanbanTask(id);
  }

  @Delete(':id')
  async deleteKanbanTask(@Param('id') id: string) {
    return await this.kanbanTaskService.deleteKanbanTask(id);
  }
}
