import { Module } from '@nestjs/common';
import { UserSavedLocationRepositoryService } from './repositories/user-saved-location.repository';
import { UserSavedController } from './user-saved.controller';
import { UserSavedService } from './user-saved.service';

@Module({
  controllers: [UserSavedController],
  providers: [UserSavedService, UserSavedLocationRepositoryService],
})
export class UserSavedModule {}
