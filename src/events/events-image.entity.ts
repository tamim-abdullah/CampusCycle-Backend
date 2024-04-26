import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventsImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
