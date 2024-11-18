import { DataSource } from "typeorm";
import User from "../entities/User.entity";
import Family from "../entities/Family.entity";
import Category from "../entities/Category.entity";
import Income from "../entities/Income.entity";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    User,
    Family,
    Category,
    Income  
  ], //Importe TOUTES les entities
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});