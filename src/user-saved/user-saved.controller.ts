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
import { User } from '@prisma/client';
import { GetCurrentUser } from 'src/authentication/decorators/getCurrentUser.decorator';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GetUserSavedLocationDto } from './dto/get-user-saved-location.dto';
import { UserSavedLocationDto } from './dto/user-saved-location.dto';
import { UserSavedService } from './user-saved.service';

@Controller('user-saved')
@UseGuards(JwtAuthenticationGuard)
export class UserSavedController {
  constructor(private readonly userSavedService: UserSavedService) {}
  @Get()
  getUserSavedLocation(
    @GetCurrentUser() user: User,
    @Query() query: GetUserSavedLocationDto,
  ) {
    return this.userSavedService.getUserSavedLocation(query, user.id);
  }

  @Post()
  saveUserLocation(
    @GetCurrentUser() user: User,
    @Body() body: UserSavedLocationDto,
  ) {
    return this.userSavedService.saveUserLocation(body, user.id);
  }

  @Delete(':id')
  deleteUserLocation(
    @GetCurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userSavedService.deleteLocation(id, user.id);
  }
}
