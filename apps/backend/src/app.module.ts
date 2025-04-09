import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, TodoModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
