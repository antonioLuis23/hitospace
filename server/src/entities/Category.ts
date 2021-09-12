import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  TreeChildren,
  TreeParent,
  Tree,
} from "typeorm";

@ObjectType()
@Entity()
@Tree("materialized-path")
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  bgColor: string;

  @Field()
  @Column()
  textColor: string;

  // @Field({ nullable: true })
  @TreeParent()
  parent: Category;

  @Field(() => [Category], { nullable: true })
  @TreeChildren()
  catChildren: Category[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
