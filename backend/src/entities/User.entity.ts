import { Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import * as argon2 from "argon2";
import { Field, ObjectType } from "type-graphql";
import Family from "./Family.entity";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import Income from "./Income.entity";

@ObjectType()
@Entity()
export default class User {
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

    private tempPassword: string;

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Field()
    @IsEmail({}, { message: "L'email n'est pas valide" })
    @Column()
    email: string;

    @Field()
    @IsNotEmpty({ message: "Le prénom est obligatoire" })
    @Length(2, 50, { message: "Le prénom doit être entre 2 et 50 caractères" })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'-]+)*$/, {
        message: "Le prénom ne doit contenir que des lettres, des espaces et des caractères spéciaux autorisés (apostrophes, tirets)."
    })
    @Column()
    firstname: string;

    @Field()
    @IsNotEmpty({ message: "Le nom est obligatoire" })
    @Length(2, 50, { message: "Le nom doit être entre 2 et 50 caractères" })
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

    @Field(() => [Family])
    @OneToMany(() => Income, income => income.user)
    incomes: Income[];
}



    
