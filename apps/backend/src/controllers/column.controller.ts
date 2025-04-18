import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateColumnDTO,
  RenameColumnDTO,
  UpdateColumnDTO,
} from 'src/dto/column.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ColumnService } from 'src/services/column.service';

@Controller('column')
@UseGuards(AuthGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get(':kanbanId')
  async getColumns(@Param('kanbanId') kanbanId: string) {
    return await this.columnService.getColumns(kanbanId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createColumn(@Req() req: Request, @Body() body: CreateColumnDTO) {
    const userId = req['user'].id as string;
    return await this.columnService.createColumn(userId, body);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateColumn(@Param('id') id: string, @Body() body: UpdateColumnDTO) {
    return await this.columnService.updateColumn(id, body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async renameColumn(@Param('id') id: string, @Body() body: RenameColumnDTO) {
    return await this.columnService.renameColumn(id, body);
  }

  @Delete(':id')
  async deleteColumn(@Param('id') id: string) {
    return await this.columnService.deleteColumn(id);
  }
}
