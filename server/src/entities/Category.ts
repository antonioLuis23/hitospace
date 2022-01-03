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
  ManyToOne,
} from "typeorm";
import { Employee } from "./Employee";
import { CompanyLayout } from "./CompanyLayout";
import { User } from "./User";

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

  // @Field({ nullable: true })
  @TreeParent({ onDelete: "CASCADE" })
  parent: Category;

  @Field(() => [Employee], { nullable: true })
  @ManyToMany(() => Employee, (employee) => employee.sectors, {
    cascade: true,
  })
  employees: Employee[];

  @Field()
  @Column()
  layoutId: number;

  @Field(() => CompanyLayout)
  @ManyToOne(() => CompanyLayout, (layout) => layout.categories)
  layout: CompanyLayout;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @Field(() => [Category], { nullable: true })
  @TreeChildren({
    cascade: true,
  })
  catChildren: Category[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
