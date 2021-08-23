import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './tasks.status-enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  status: taskStatus;
}
