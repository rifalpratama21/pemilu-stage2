import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./Article";
import { Vote } from "./Vote";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Vote, (vote) => vote.users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  vote: Vote;

  @OneToMany(() => Article, (article) => article.users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  article: Article[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
