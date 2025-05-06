import {
  Controller,
  Post,
  Req,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateKanbanDTO } from 'src/dto/kanban.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { KanbanService } from 'src/services/kanban.service';

@Controller('kanban')
@UseGuards(AuthGuard)
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createKanban(@Req() req: Request, @Body() body: CreateKanbanDTO) {
    const userId = req['user'].id as string;
    return await this.kanbanService.createKanban(userId, body);
  }
}
