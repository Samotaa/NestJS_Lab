import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: '10.51.32.4',
    database: 'postgres',
    username: 'postgres',
    password: '12qwaszx',
    port: 5432,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),UsersModule, TrainersModule],
})
export class AppModule {}
