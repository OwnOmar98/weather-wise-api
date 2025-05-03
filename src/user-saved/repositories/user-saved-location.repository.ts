import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSavedLocationErrorCodesEnum } from '../errors/user-saved-locations.error-codes.enum';

@Injectable()
export class UserSavedLocationRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getSavedLocations({
    where,
    skip,
    take,
  }: {
    where?: Prisma.SavedLocationWhereInput;
    skip: number;
    take: number;
  }) {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.savedLocation.findMany({
        where,
        include: {
          location: true,
        },
        skip,
        take,
      }),
      this.prisma.savedLocation.count({
        where,
      }),
    ]);
    return { data, count };
  }
  async createLocation(data: Prisma.SavedLocationUncheckedCreateInput) {
    try {
      const location = await this.prisma.savedLocation.create({
        data,
        include: {
          location: true,
        },
      });
      return location;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            errorCode:
              UserSavedLocationErrorCodesEnum.UserSavedLocationAlreadyExist,
            message: 'Location Already had been saved',
          });
        } else if (error.code === 'P2003')
          throw new BadRequestException({
            errorCode: UserSavedLocationErrorCodesEnum.LocationNotFound,
            message: 'Location Not Fount',
          });
      }
      throw error;
    }
  }
  async deleteLocation(where: Prisma.SavedLocationWhereUniqueInput) {
    try {
      await this.prisma.savedLocation.delete({ where });
      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
            errorCode:
              UserSavedLocationErrorCodesEnum.UserSavedLocationNotFound,
            message: 'Location Not Found',
          });
        }
      }
      throw error;
    }
  }
}
