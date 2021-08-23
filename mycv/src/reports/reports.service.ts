import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { ReportDto } from './dto/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repo: Repository<Report>,
  ) {}
  async createReport(reportDto: ReportDto, user: User) {
    const report = await this.repo.create(reportDto);
    report.user = user;
    return await this.repo.save(report);
  }
}
