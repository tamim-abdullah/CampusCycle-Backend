import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
