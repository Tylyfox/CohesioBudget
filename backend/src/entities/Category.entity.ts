import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Family from "./Family.entity";

@ObjectType()
@Entity()
export default class Category {
 
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: "income" | "expense";

    @Field(() => Family)
    @ManyToOne(() => Family, family => family.categories)
    family: Family;
}