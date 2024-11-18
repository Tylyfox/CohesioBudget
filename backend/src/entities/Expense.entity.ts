import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import User from "./User.entity";
import Family from "./Family.entity";

@ObjectType()
@Entity()
export default class Expense {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    amount: number;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    date: Date;

    @Field(() => User)
    @ManyToOne(() => User, user  => user.expenses)
    user: User;

    @Field(() => Family)
    @ManyToOne(() => Family, family => family.expenses)
    family: Family;
}