import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GetLocationDto } from './dto/get-locations.dto';
import { LocationDto } from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('locations')
@UseGuards(JwtAuthenticationGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getLocations(@Query() query: GetLocationDto) {
    return this.locationService.getLocations(query);
  }
  @Post()
  createLocation(@Body() body: LocationDto) {
    return this.locationService.createLocation(body);
  }

  @Delete(':id')
  deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }
}
