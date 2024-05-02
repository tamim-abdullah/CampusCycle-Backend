import { EventTag } from 'src/eventtags/eventtag.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => EventTag, (eventTag) => eventTag.events)
  eventTags: EventTag[];
}
