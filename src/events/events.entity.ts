import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  eventName: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  details: string;

  @Column('simple-array')
  tags: string[];
}
