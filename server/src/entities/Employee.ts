import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class Employee extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  name!: string;

  @Field()
  @Column({ type: "text", unique: true })
  email!: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  abilities: string;

  @Field()
  @Column({ type: "text" })
  function!: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  tags: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  country: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  state: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  chat: string;

  @ManyToMany(() => Category, (category) => category.employees, {
    cascade: true,
  })
  @JoinTable()
  sectors: Category[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
