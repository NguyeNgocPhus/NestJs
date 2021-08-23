import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { CurrentUserMiddleware } from 'src/users/middleware/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),

    TypeOrmModule.forFeature([User]),
  ],
  providers: [ReportsService, UsersService],
  controllers: [ReportsController],
})
export class ReportsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('reports');
  }
}
