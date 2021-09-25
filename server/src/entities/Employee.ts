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
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abilities: string;

  @Field()
  @Column()
  function!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tags: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locationCountry: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locationState: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locationCity: string;

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
