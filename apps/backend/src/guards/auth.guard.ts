import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: FastifyRequest = context.switchToHttp().getRequest();

    const authToken = this.getTokenFromCookie(req);

    if (!authToken) {
      throw new HttpException(
        'Usuário não autenticado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(authToken, {
        secret: jwtConstants.secret,
      });

      req['user'] = payload;
    } catch {
      throw new HttpException(
        'Usuário não autenticado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private getTokenFromCookie(req: FastifyRequest): string | undefined {
    const authToken = req.cookies?.accessToken;
    return authToken;
  }
}
