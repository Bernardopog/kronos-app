import { verify } from 'jsonwebtoken';
import type { Socket } from 'socket.io';

export function socketAuthMiddleware(jwtSecret: string) {
  return (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth?.token;

    if (!token || typeof token !== 'string') {
      console.warn("Token not found or Invalid");
      return next(new Error('Auth not found'));
    }

    try {
      const decoded = verify(token.replace("Bearer ", ""), jwtSecret);
      socket.data.user = decoded;
      next();
    } catch (err) {
      console.error("Invalid or expired token", err.message);
      return next(new Error('Invalid or expired token'));
    }
  };
}
