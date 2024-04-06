import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [UsersModule, UniversitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
