import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { jwtConstants } from '../constants/jwt.constant';

type fieldTypes = 'email' | 'password' | 'username';
type fields = fieldTypes[];

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDTO) {
    const foundUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
    if (foundUser)
      throw new HttpException(
        {
          error: true,
          fields: ['email', 'username'] as fields,
          message: 'Email ou Nome de usuário já existentes',
        },
        HttpStatus.UNAUTHORIZED,
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prismaService.user.create({
      data: {
        email: data.email,
        username: data.username,
        displayName: data.displayName,
        password: hashedPassword,
      },
    });

    return { error: false, fields: [], message: 'User created successfully' };
  }

  async signIn(data: SignInDTO) {
    const invalidMessage = 'Invalid Credentials';

    const foundEmail = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!foundEmail)
      throw new HttpException(
        {
          error: true,
          fields: ['email', 'password'] as fields,
          message: invalidMessage,
        },
        HttpStatus.NOT_FOUND,
      );

    const isValidPassword = await bcrypt.compare(
      data.password,
      foundEmail.password,
    );
    if (!isValidPassword)
      throw new HttpException(
        {
          error: true,
          fields: ['email', 'password'] as fields,
          message: invalidMessage,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const accessToken = this.jwtService.sign({
      id: foundEmail.id,
      email: foundEmail.email,
      username: foundEmail.username,
      displayName: foundEmail.displayName,
    });

    return { accessToken };
  }

  async me(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers.authorization;
    const [type, tokenValue] = token?.split(' ') ?? [];

    if (type !== 'Bearer' || !tokenValue) throw new HttpException('Token not found', 401);  
    if (!tokenValue) throw new HttpException('Token not found', 401);

    const decoded = this.jwtService.verify(tokenValue, {
      secret: jwtConstants.secret,
    });

    const user = await this.prismaService.user.findUnique({
      where: {
        id: decoded.id,
      },
      omit: { password: true },
    });
    return reply.send({ user });
  }
}
