import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import User from "../entities/User.entity";

export default class UserService {
    db: Repository<User>;
    constructor() {
        this.db = datasource.getRepository(User);
    };

    async list(): Promise<User[]> {
        return await this.db.find();
    }
}