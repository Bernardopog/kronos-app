import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthGuard } from 'src/guards/auth.guard';

declare module 'fastify' {
  interface FastifyRequest {
    cookies: { [key: string]: string };
  }
  interface FastifyReply {
    setCookie(name: string, value: string, options?: any): void;
    clearCookie(name: string, options?: any): void;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const user = await this.authService.me(req, reply);
    return reply.send({ user });
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signUp(@Body() body: SignUpDTO) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDTO, @Res() reply: FastifyReply) {
    const jwt = await this.authService.signIn(body);

    return reply.send({ error: false, fields: [jwt], message: 'Autenticado' });
  }

  @Get('signout')
  async signOut(@Res() reply: FastifyReply) {
    reply.clearCookie('accessToken', { path: '/' });
    return reply.send({ error: false, fields: [], message: 'Deslogado' });
  }
}
