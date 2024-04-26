import { Comment } from 'src/comments/comment.entity';
import { Group } from 'src/groups/group.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  time: Date;

  @Column()
  upVote: number;

  @Column()
  postType: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Group, (group) => group.posts)
  group: Group;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
