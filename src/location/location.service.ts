import { Injectable } from '@nestjs/common';
import { GetLocationDto } from './dto/get-locations.dto';
import { LocationDto } from './dto/location.dto';
import { LocationRepositoryService } from './repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepositoryService: LocationRepositoryService,
  ) {}

  getLocations({ skip, take }: GetLocationDto) {
    return this.locationRepositoryService.getLocations({ skip, take });
  }

  createLocation(body: LocationDto) {
    return this.locationRepositoryService.createLocation(body);
  }

  deleteLocation(id: number) {
    return this.locationRepositoryService.deleteLocation({ id });
  }
}
