import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './modules/todo.module';
import { CategoryModule } from './modules/category.module';
import { NoteModule } from './modules/note.module';
import { TagModule } from './modules/tag.module';

@Module({
  imports: [AuthModule, TodoModule, CategoryModule, NoteModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
