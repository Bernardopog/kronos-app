import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(@Req() req) {
    const userId = req['user'].id as string;
    return this.categoryService.getCategories(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createCategory(@Req() req, @Body() body) {
    const userId = req['user'].id as string;
    return this.categoryService.createCategory(userId, body);
  }

  @Patch(':id')
  async renameCategory(@Param('id') id: string, @Body() body) {
    return this.categoryService.renameCategory(id, body);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
