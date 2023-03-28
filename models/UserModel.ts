import {IModelWithId} from "~/models/IModelWithId";

export interface UserModel extends IModelWithId{
    login: string,
    fio: string,
    isOnline: boolean
    password?: string
    createdAt?: string,

}