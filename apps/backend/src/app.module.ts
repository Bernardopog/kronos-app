import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './modules/todo.module';
import { CategoryModule } from './modules/category.module';
import { NoteModule } from './modules/note.module';
import { TagModule } from './modules/tag.module';
import { KanbanModule } from './modules/kanban.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    CategoryModule,
    NoteModule,
    TagModule,
    KanbanModule,
  ],
})
export class AppModule {}
