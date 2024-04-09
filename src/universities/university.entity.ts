import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortName: string;

  @Column()
  fullName: string;

  @OneToMany(() => User, (user) => user.university)
  users: User[];
}
