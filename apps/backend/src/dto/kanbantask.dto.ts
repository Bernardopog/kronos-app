import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

type taskPriorityType = 'low' | 'medium' | 'high';

export class CreateKanbanTaskDTO {
  @IsString()
  taskName: string;

  @IsUUID()
  columnId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['low', 'medium', 'high'])
  priority: taskPriorityType;
}

export class UpdateKanbanTaskDTO {
  @IsString()
  taskName: string;

  @IsString()
  description: string;

  @IsEnum(['low', 'medium', 'high'])
  priority: taskPriorityType;

  @IsUUID()
  columnId: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  completionDate: Date;

  @IsArray()
  @IsOptional()
  team: string[];
}

export class MoveKanbanTaskDTO {
  @IsUUID()
  columnId: string;
}
