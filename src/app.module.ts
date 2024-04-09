import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UniversitiesModule } from './universities/universities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './universities/university.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    UsersModule,
    UniversitiesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [University, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
