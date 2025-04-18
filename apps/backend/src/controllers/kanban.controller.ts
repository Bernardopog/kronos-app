import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Req,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AddUserToKanbanDTO,
  CreateKanbanDTO,
  RemoveUserFromKanbanDTO,
  SetUserRoleDTO,
  UpdateKanbanDTO,
} from 'src/dto/kanban.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { KanbanService } from 'src/services/kanban.service';

@Controller('kanban')
@UseGuards(AuthGuard)
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Get()
  async getKanbans(@Req() req: Request) {
    const userId = req['user'].id as string;
    return await this.kanbanService.getKanbans(userId);
  }

  @Get(':id')
  async getSpecificKanban(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user'].id as string;
    return await this.kanbanService.getSpecificKanban(id, userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createKanban(@Req() req: Request, @Body() body: CreateKanbanDTO) {
    const userId = req['user'].id as string;
    return await this.kanbanService.createKanban(userId, body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async renameKanban(@Param('id') id: string, @Body() body: UpdateKanbanDTO) {
    return await this.kanbanService.renameKanban(id, body);
  }

  @Delete(':id')
  async deleteKanban(@Param('id') id: string) {
    return await this.kanbanService.deleteKanban(id);
  }

  @Get('/authorized')
  async getAuthorizedKanbans(@Req() req: Request) {
    const userId = req['user'].id as string;
    return await this.kanbanService.getAuthorizedKanbans(userId);
  }

  @Get('/authorized/:kanbanid')
  async getAuthorizedKanban(
    @Req() req: Request,
    @Param('kanbanid') kanbanId: string,
  ) {
    const userId = req['user'].id as string;
    return await this.kanbanService.getAuthorizedKanban(userId, kanbanId);
  }

  @Post('/add')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addUserToKanban(@Body() body: AddUserToKanbanDTO) {
    return await this.kanbanService.addUserToKanban(body);
  }

  @Delete('/remove')
  async removeUserFromKanban(@Body() body: RemoveUserFromKanbanDTO) {
    return await this.kanbanService.removeUserFromKanban(body);
  }

  @Patch('/role')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async setUserRole(@Body() body: SetUserRoleDTO) {
    return await this.kanbanService.setUserRole(body);
  }
}
