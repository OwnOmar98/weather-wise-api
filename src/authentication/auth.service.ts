import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthenticationErrorCodesEnum } from './errors/authentication.error-codes.enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register({ password, email, ...rest }: RegisterDto) {
    try {
      const hashedPassword = await argon2.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          hashedPassword,
          ...rest,
        },
      });

      return this.login(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            errorCode: AuthenticationErrorCodesEnum.EmailInUse,
            message: 'Email is Already used',
          });
        }
      }
      throw error;
    }
  }

  login(user: User) {
    const token = this.jwt.sign({ sub: user.id, email: user.email });

    return { access_token: token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException({
        errorCode: AuthenticationErrorCodesEnum.InvalidCredentials,
        explanation: 'Wrong Credentials Provided',
      });
    }
    const isMatch = await argon2.verify(user.hashedPassword, password);
    if (!isMatch)
      throw new BadRequestException({
        errorCode: AuthenticationErrorCodesEnum.InvalidCredentials,
        explanation: 'Wrong Credentials Provided',
      });
    return user;
  }
}
