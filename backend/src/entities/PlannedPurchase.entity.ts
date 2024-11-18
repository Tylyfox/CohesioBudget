import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import Family from "./Family.entity";

@ObjectType()
@Entity()
export default class PlannedPurchase {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    amount: number;

    @Field()
    @Column()
    priority: "essentiel" | "secondaire" | "reportable"

    @Field()
    @Column()
    plannedDate: Date;

    @Field()
    @Column()
    purchase: boolean;

    @Field(() => Family)
    @ManyToOne(() => Family, family => family.purchases)
    family: Family;
}