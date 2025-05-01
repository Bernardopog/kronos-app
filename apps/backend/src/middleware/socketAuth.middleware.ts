import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';

export function socketAuthMiddleware(jwtSecret: string) {
  return (socket: Socket, next: (err?: Error) => void) => {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error('Cookies não enviados'));
    }

    let cookies: Record<string, string>;
    try {
      // eslint-disable-next-line
      cookies = parse(cookieHeader) as Record<string, string>;
    } catch {
      return next(new Error('Falha no parse do cookie'));
    }

    const token = cookies['accessToken'];

    if (typeof token !== 'string') {
      return next(new Error('Token de acesso não encontrado'));
    }

    try {
      const decoded = verify(token, jwtSecret);
      socket.data.user = decoded;
      next();
    } catch {
      return next(new Error('Invalid or expired token'));
    }
  };
}
