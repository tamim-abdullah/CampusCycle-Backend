import { Comment } from 'src/comments/comment.entity';
import { Group } from 'src/groups/group.entity';
import { Post } from 'src/posts/post.entity';
import { University } from 'src/universities/university.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];
}
