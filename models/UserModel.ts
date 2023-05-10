import {IModel} from "~/models/IModel";

export interface UserModel extends IModel{
    login: string,
    fio: string
    type: number
    isOnline?: boolean
    password?: string
    createdAt?: string,

}