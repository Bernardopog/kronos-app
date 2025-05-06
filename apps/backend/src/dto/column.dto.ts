import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateColumnDTO {
  @IsString()
  columnName: string;

  @IsUUID()
  kanbanId: string;
}

export class UpdateColumnDTO {
  @IsArray()
  color: number[];

  @IsString()
  icon: string;
}
