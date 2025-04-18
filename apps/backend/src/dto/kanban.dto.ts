import { IsEnum, IsString, IsUUID } from 'class-validator';

type rolesType = 'read' | 'write' | 'admin';

export class CreateKanbanDTO {
  @IsString()
  title: string;
}

export class UpdateKanbanDTO extends CreateKanbanDTO {}

export class AddUserToKanbanDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  kanbanId: string;
}

export class RemoveUserFromKanbanDTO extends AddUserToKanbanDTO {}

export class SetUserRoleDTO {
  @IsUUID()
  kanbanId: string;

  @IsUUID()
  userId: string;

  @IsEnum(['read', 'write', 'admin'])
  role: rolesType;
}
