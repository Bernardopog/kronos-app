import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoTaskDTO, UpdateTodoTaskDTO } from '../dto/todo.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTaskList(@Req() req) {
    const userId = req['user'].id as string;
    return this.todoService.getTaskList(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTask(@Body() body: CreateTodoTaskDTO, @Req() req) {
    const userId = req['user'].id as string;
    return this.todoService.createTask(body, userId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateTask(@Param('id') id: string, @Body() body: UpdateTodoTaskDTO) {
    return this.todoService.updateTask(id, body);
  }

  @Delete()
  async deleteMany(
    @Query('target') query: 'all' | 'completed' | 'uncompleted',
    @Req() req,
  ) {
    const userId = req['user'].id as string;
    return this.todoService.deleteMany(query, userId);
  }

  @Delete(':id')
  async deleteSpecific(@Param('id') id: string) {
    return this.todoService.deleteSpecific(id);
  }
}
