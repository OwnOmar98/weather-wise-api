import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { LocationConsumer } from './location.consumer';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepositoryService } from './repositories/location.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location-queue',
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationConsumer, LocationRepositoryService],
  exports: [BullModule],
})
export class LocationModule {}
