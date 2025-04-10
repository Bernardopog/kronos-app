import { IsEnum, IsOptional, IsString } from 'class-validator';

type Priority =
  | 'level_0'
  | 'level_1'
  | 'level_2'
  | 'level_3'
  | 'level_4'
  | 'level_5';

export class UpdateTodoTaskDTO {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['level_0', 'level_1', 'level_2', 'level_3', 'level_4', 'level_5'])
  priority: Priority;

  @IsString()
  @IsOptional()
  categoryId?: string;
}

export class CreateTodoTaskDTO extends UpdateTodoTaskDTO {}
