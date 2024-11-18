import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import Family from "./Family.entity";

@ObjectType()
@Entity()
export default class Income {
    
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
    @ManyToOne(() => User, user => user.incomes)
    user: User;

    @Field(() => Family)
    @ManyToOne(() => Family, family => family.incomes)
    family: Family;

}