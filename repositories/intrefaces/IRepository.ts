import {IModel} from "~/models/IModel";

export interface IRepository<T extends IModel>{
    getAll(): Promise<T[]>
    getById(id: number): Promise<T>
    update(model: T): Promise<void>
    delete(model: T): Promise<void>

}