import { Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, Column } from "typeorm";
import * as argon2 from "argon2";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // Ce décorateur rend la classe utilisable dans GraphQL
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

    @Field() // Champ exposé dans GraphQL
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Field() // Champ exposé dans GraphQL
    @Column()
    email: string;

    @Column() // Champ de base de données, non exposé dans GraphQL
    password: string;
}
