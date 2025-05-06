import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { jwtConstants } from 'src/constants/jwt.constant';
import { CreateColumnDTO, UpdateColumnDTO } from 'src/dto/column.dto';
import {
  AddUserToKanbanDTO,
  RemoveUserFromKanbanDTO,
  SetUserRoleDTO,
} from 'src/dto/kanban.dto';
import {
  CreateKanbanTaskDTO,
  UpdateKanbanTaskDTO,
} from 'src/dto/kanbantask.dto';
import { socketAuthMiddleware } from 'src/middleware/socketAuth.middleware';
import { ColumnService } from 'src/services/column.service';
import { KanbanService } from 'src/services/kanban.service';
import { KanbanTaskService } from 'src/services/kanbantask.service';

@WebSocketGateway({
  namespace: '/kanbansocket',
  cors: { origin: 'http://localhost:3000', credentials: true },
})
export class KanbanGateway implements OnGatewayInit {
  constructor(
    private readonly kanbanService: KanbanService,
    private readonly columnService: ColumnService,
    private readonly kanbanTaskService: KanbanTaskService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    server.use(socketAuthMiddleware(jwtConstants.secret!));
  }

  @SubscribeMessage('joinKanban')
  async joinKanban(
    @MessageBody() kanbanId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(kanbanId);
  }

  @SubscribeMessage('exitKanbans')
  async exitKanban(@ConnectedSocket() client: Socket) {
    for (const room of client.rooms) {
      if (room !== client.id) {
        await client.leave(room);
      }
    }
  }

  @SubscribeMessage('getKanbans')
  async getKanbans(@ConnectedSocket() client: Socket) {
    const userId = client.data['user'].id as string;
    const kanbans = await this.kanbanService.getKanbans(userId);
    client.emit('kanbanListFetched', kanbans);
  }

  @SubscribeMessage('getAuthorizedKanbans')
  async getAuthorizedKanbans(@ConnectedSocket() client: Socket) {
    const userId = client.data['user'].id as string;
    const authorizedKanbans =
      await this.kanbanService.getAuthorizedKanbans(userId);
    client.emit('authorizedKanbanListFetched', authorizedKanbans);
  }

  @SubscribeMessage('getSpecificKanbanFull')
  async getSpecificKanbanFull(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data['user'].id as string;
    const selectedKanban = await this.kanbanService.getKanbanFull(id, userId);
    client.emit('selectedKanban', selectedKanban);
  }

  @SubscribeMessage('renameKanban')
  async renameKanban(
    @MessageBody() body: { id: string; title: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data['user'].id as string;
    await this.kanbanService.renameKanban(body.id, body.title);
    const updatedKanban = await this.kanbanService.getKanbanFull(
      body.id,
      userId,
    );
    this.server.emit('updatedKanban', updatedKanban);
  }

  @SubscribeMessage('deleteKanban')
  async deleteKanban(@MessageBody() id: string) {
    await this.kanbanService.deleteKanban(id);
    this.server.emit('deletedKanban');
  }

  @SubscribeMessage('createColumn')
  async createColumn(
    @MessageBody() title: CreateColumnDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data['user'].id as string;
    const createdColumn = await this.columnService.createColumn(userId, title);
    this.server.in(createdColumn.kanbanId).emit('columnCreated');
  }

  @SubscribeMessage('updateColumn')
  async updateColumn(
    @MessageBody() body: { columnId: string; data: UpdateColumnDTO },
  ) {
    const updatedColumn = await this.columnService.updateColumn(
      body.columnId,
      body.data,
    );
    this.server.in(updatedColumn.kanbanId).emit('columnUpdated');
  }

  @SubscribeMessage('renameColumn')
  async renameColumn(
    @MessageBody() body: { columnId: string; columnName: string },
  ) {
    const updatedColumn = await this.columnService.renameColumn(
      body.columnId,
      body.columnName,
    );
    this.server.in(updatedColumn.kanbanId).emit('columnRenamed');
  }

  @SubscribeMessage('deleteColumn')
  async deleteColumn(@MessageBody() id: string) {
    const deletedColumn = await this.columnService.deleteColumn(id);
    this.server.in(deletedColumn.kanbanId).emit('columnDeleted');
  }

  @SubscribeMessage('createKanbanTask')
  async createKanbanTask(
    @MessageBody() body: { kanbanId: string; data: CreateKanbanTaskDTO },
  ) {
    await this.kanbanTaskService.createKanbanTask(body.data);
    this.server.in(body.kanbanId).emit('kanbanTaskCreated');
  }

  @SubscribeMessage('updateKanbanTask')
  async updateKanbanTask(
    @MessageBody()
    body: {
      kanbanId: string;
      id: string;
      data: UpdateKanbanTaskDTO;
    },
  ) {
    await this.kanbanTaskService.updateKanbanTask(body.id, body.data);
    this.server.in(body.kanbanId).emit('kanbanTaskUpdated');
  }

  @SubscribeMessage('deleteKanbanTask')
  async deleteKanbanTask(
    @MessageBody() body: { kanbanId: string; id: string },
  ) {
    await this.kanbanTaskService.deleteKanbanTask(body.id);
    this.server.in(body.kanbanId).emit('kanbanTaskDeleted');
  }

  @SubscribeMessage('moveKanbanTaskToColumn')
  async moveKanbanTaskToColumn(
    @MessageBody()
    body: {
      kanbanId: string;
      id: string;
      columnId: string;
    },
  ) {
    await this.kanbanTaskService.moveKanbanTaskToColumn(body.id, body.columnId);
    this.server.in(body.kanbanId).emit('kanbanTaskMoved');
  }

  @SubscribeMessage('completeKanbanTask')
  async completeKanbanTask(
    @MessageBody() body: { kanbanId: string; id: string },
  ) {
    await this.kanbanTaskService.completeKanbanTask(body.id);
    this.server.in(body.kanbanId).emit('kanbanTaskCompleted');
  }

  @SubscribeMessage('addUserToKanban')
  async addUserToKanban(@MessageBody() body: AddUserToKanbanDTO) {
    await this.kanbanService.addUserToKanban(body);
    this.server.in(body.kanbanId).emit('userAdded');
  }

  @SubscribeMessage('removeUserFromKanban')
  async removeUserFromKanban(@MessageBody() body: RemoveUserFromKanbanDTO) {
    await this.kanbanService.removeUserFromKanban(body);
    this.server.in(body.kanbanId).emit('userRemoved');
  }

  @SubscribeMessage('changeUserRole')
  async changeUserRole(@MessageBody() body: SetUserRoleDTO) {
    await this.kanbanService.setUserRole(body);
    this.server.in(body.kanbanId).emit('userRoleChanged');
  }
}
