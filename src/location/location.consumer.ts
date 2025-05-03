import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LocationRepositoryService } from './repositories/location.repository';

@Processor('location-queue')
export class LocationConsumer extends WorkerHost {
  constructor(
    private readonly locationRepositoryService: LocationRepositoryService,
  ) {
    super();
  }
  async process(
    job: Job<
      {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
      },
      void,
      string
    >,
  ) {
    const { name, region, country, lat, lon } = job.data;
    const isExist = await this.locationRepositoryService.getLocation({
      name_country: {
        name,
        country,
      },
    });
    if (!isExist) {
      await this.locationRepositoryService.createLocation({
        name,
        region,
        country,
        lat,
        lon,
      });
    }
  }
}
