import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./User.entity";
import { IsDate, IsNotEmpty } from "class-validator";
import Income from "./Income.entity";
import Category  from "./Category.entity";

@ObjectType()
@Entity()
export default class Family {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @IsNotEmpty({ message: "Le nom de la famille est obligatoire" })
    @Column()
    name: string;

    @Field()
    @IsDate({ message: "La date de création doit être une date" })
    @Column()
    createdAt: Date;

    @Field(() => [User]) // Relation OneToMany vers User
    @OneToMany(() => User, user => user.family)
    users: User[];

    @Field(() => [Income])
    @OneToMany(() => Income, income => income.family)
    incomes: Income[];

    @Field(() => [Category])
    @OneToMany(() => Category, category => category.family)
    categories: Category[];
}