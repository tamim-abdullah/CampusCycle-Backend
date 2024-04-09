import { University } from 'src/universities/university.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => University, (university) => university.users)
  university: University;
}
