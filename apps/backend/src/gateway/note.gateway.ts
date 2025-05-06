import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NoteService } from 'src/services/note.service';
import { socketAuthMiddleware } from 'src/middleware/socketAuth.middleware';
import { jwtConstants } from 'src/constants/jwt.constant';

@WebSocketGateway({
  namespace: '/notesocket',
  cors: { origin: 'http://localhost:3000', credentials: true },
})
export class NoteGateway implements OnGatewayInit {
  constructor(private readonly noteService: NoteService) {}

  afterInit(server: Server) {
    server.use(socketAuthMiddleware(jwtConstants.secret!));
  }

  @SubscribeMessage('favoriteNote')
  async favoriteNote(
    @MessageBody() noteId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const note = await this.noteService.toggleFavorite(noteId);
    client.emit('noteFavorited', note);
  }

  @SubscribeMessage('changeIcon')
  async changeIcon(
    @MessageBody() body: { noteId: string; icon: string },
    @ConnectedSocket() client: Socket,
  ) {
    const note = await this.noteService.changeIcon(body.noteId, body.icon);
    client.emit('noteIconChanged', note);
  }

  @SubscribeMessage('renameNote')
  async renameNote(
    @MessageBody() body: { noteId: string; title: string },
    @ConnectedSocket() client: Socket,
  ) {
    const note = await this.noteService.renameNote(body.noteId, body.title);
    client.emit('noteRenamed', note);
  }
}
