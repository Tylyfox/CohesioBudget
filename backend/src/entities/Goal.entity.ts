import {Field, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Family from "./Family.entity";

@ObjectType()
@Entity()
export default class Goal {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    targetAmount: number;

    @Field()
    @Column()
    savedAmount: number;

    @Field()
    @Column()
    deadline: Date;

    @Field()
    @Column()
    createdAt: Date;

    @Field(() => Family)
    @ManyToOne(() => Family, family => family.goals)
    family: Family;
}