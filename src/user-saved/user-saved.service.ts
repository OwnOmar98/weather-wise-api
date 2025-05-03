import { Injectable } from '@nestjs/common';
import { GetUserSavedLocationDto } from './dto/get-user-saved-location.dto';
import { UserSavedLocationDto } from './dto/user-saved-location.dto';
import { UserSavedLocationRepositoryService } from './repositories/user-saved-location.repository';

@Injectable()
export class UserSavedService {
  constructor(
    private readonly userSavedLocationRepositoryService: UserSavedLocationRepositoryService,
  ) {}
  getUserSavedLocation(
    { skip, take }: GetUserSavedLocationDto,
    userId: number,
  ) {
    return this.userSavedLocationRepositoryService.getSavedLocations({
      where: {
        userId,
      },
      skip,
      take,
    });
  }
  saveUserLocation({ locationId }: UserSavedLocationDto, userId: number) {
    return this.userSavedLocationRepositoryService.createLocation({
      locationId,
      userId,
    });
  }
  deleteLocation(id: number, userId: number) {
    return this.userSavedLocationRepositoryService.deleteLocation({
      id,
      userId,
    });
  }
}
