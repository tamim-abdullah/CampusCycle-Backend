import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  groupType: string; // "LOCAL" OR "GLOBAL"

  @Column({ nullable: true })
  imageurl: string;

  @OneToMany(() => Post, (post) => post.group)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
