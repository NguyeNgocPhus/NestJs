import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/users/decorator.ts/current-user.decorator';

import { User } from 'src/users/users.entity';
import { ReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: ReportDto, @CurrentUser() user: User) {
    console.log(user);

    const report = this.reportService.createReport(body, user);
    return report;
  }
}
