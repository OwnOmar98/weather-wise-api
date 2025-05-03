import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthenticationErrorCodesEnum } from '../errors/authentication.error-codes.enum';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    user: User,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    if (!user) {
      throw new BadRequestException({
        errorCode: AuthenticationErrorCodesEnum.InvalidAccessToken,
        explanation: 'Invalid JWT token',
      });
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
