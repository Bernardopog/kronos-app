import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TodoService } from '../services/todo.service';
import { socketAuthMiddleware } from 'src/middleware/socketAuth.middleware';
import { jwtConstants } from 'src/constants/jwt.constant';

@WebSocketGateway({
  namespace: '/todosocket',
  cors: { origin: 'http://localhost:3000', credentials: true },
})
export class TodoGateway implements OnGatewayInit {
  constructor(private readonly todoService: TodoService) {}

  afterInit(server: Server) {
    server.use(socketAuthMiddleware(jwtConstants.secret!));
  }

  @SubscribeMessage('toggleTask')
  async toggleTask(
    @MessageBody() taskId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const task = await this.todoService.toggleTask(taskId);
    client.emit('taskToggled', task);
    return { status: 'ok', task };
  }
}
