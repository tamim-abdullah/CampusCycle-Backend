import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  image: string;

  @Column()
  eventName: string;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;

  @Column()
  details: string;

  @Column('simple-array')
  tags: string[];
}
