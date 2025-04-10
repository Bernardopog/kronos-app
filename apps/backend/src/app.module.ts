import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './note/note.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [AuthModule, TodoModule, CategoryModule, NoteModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
