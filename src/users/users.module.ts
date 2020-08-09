import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController] // export this module for visible on other modules
})
export class UsersModule {}
