import { Post } from 'src/posts/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  time: Date;

  @Column()
  upVote: number;

  @Column()
  downVote: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
