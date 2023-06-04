import {IRepository} from "~/repositories/intrefaces/IRepository";
import {UserModel} from "~/models/UserModel";

export interface AuthRepository extends IRepository<UserModel> {
    login(login: string, password: string): Promise<void>
}