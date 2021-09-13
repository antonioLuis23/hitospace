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
  ManyToMany,
} from "typeorm";
import { Employee } from "./Employee";

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

  @Field({ nullable: true })
  @Column({ nullable: true })
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

  @ManyToMany(() => Employee, (employee) => employee.sectors)
  employees: Employee[];

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
