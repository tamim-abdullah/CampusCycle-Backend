import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./../events/events.entity";

@Entity()
export class EventTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => EventEntity, (event) => event.eventTags)
  @JoinTable()
  events: EventEntity[];
}