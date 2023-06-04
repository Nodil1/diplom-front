import {IRepository} from "~/repositories/intrefaces/IRepository";
import {UserModel} from "~/models/UserModel";

export interface ManagerRepository extends IRepository<UserModel>{

}