import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './../posts/post.entity';

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.postTags)
  @JoinTable()
  posts: Post[];
}
