import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/news-microservice', { useNewUrlParser: true }),
    BlogModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
