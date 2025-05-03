import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationErrorCodesEnum } from '../errors/location.error-codes.enum';

@Injectable()
export class LocationRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getLocations({
    where,
    skip,
    take,
  }: {
    where?: Prisma.LocationWhereInput;
    skip: number;
    take: number;
  }) {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.location.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.location.count({
        where,
      }),
    ]);
    return { data, count };
  }
  getLocation(where: Prisma.LocationWhereUniqueInput) {
    return this.prisma.location.findUnique({
      where,
    });
  }
  async createLocation(data: Prisma.LocationCreateInput) {
    try {
      const location = await this.prisma.location.create({
        data,
      });
      return location;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            errorCode: LocationErrorCodesEnum.LocationAlreadyExist,
            message: 'Location Already Exist',
          });
        }
      }
      throw error;
    }
  }
  async deleteLocation(where: Prisma.LocationWhereUniqueInput) {
    try {
      await this.prisma.location.delete({ where });
      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
            errorCode: LocationErrorCodesEnum.LocationNotFound,
            message: 'Location Not Found',
          });
        }
      }
      throw error;
    }
  }
}
