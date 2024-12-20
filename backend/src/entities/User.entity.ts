import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as argon2 from "argon2";
import {Field, ObjectType} from "type-graphql";
import Family from "./Family.entity";
import {IsEmail, IsNotEmpty, Length, Matches} from "class-validator";
import Income from "./Income.entity";
import Expense from "./Expense.entity";

@ObjectType()
@Entity()
export default class User {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Field()
    @IsEmail({}, {message: "L'email n'est pas valide"})
    @Column()
    email: string;
    @Field()
    @IsNotEmpty({message: "Le prénom est obligatoire"})
    @Length(2, 50, {message: "Le prénom doit être entre 2 et 50 caractères"})
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'-]+)*$/, {
        message: "Le prénom ne doit contenir que des lettres, des espaces et des caractères spéciaux autorisés (apostrophes, tirets)."
    })
    @Column()
    firstname: string;
    @Field()
    @IsNotEmpty({message: "Le nom est obligatoire"})
    @Length(2, 50, {message: "Le nom doit être entre 2 et 50 caractères"})
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'-]+)*$/, {
        message: "Le nom ne doit contenir que des lettres, des espaces et des caractères spéciaux autorisés (apostrophes, tirets)."
    })
    @Column()
    lastname: string;
    @Column()
    password: string;
    @Field()
    @ManyToOne(() => Family, family => family.users)
    family: Family;
    @Field(() => [Income])
    @OneToMany(() => Income, income => income.user)
    incomes: Income[];
    @Field(() => [Expense])
    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[];
    private tempPassword: string;
    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
    @BeforeUpdate()
    async hashPasswordUp() {
        if (this.tempPassword) {
            this.password = await argon2.hash(this.tempPassword);
        }
    }
}




