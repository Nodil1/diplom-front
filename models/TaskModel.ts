import {TaskState} from "~/models/enum/TaskState";

export interface TaskModel {
    id: number,
    name: string,
    description: string,
    address: string,
    customer: string
    latitude: number,
    longitude: number,
    state: TaskState,
    worker?: DriverModel
    createdAt: Date,
    expireAt: Date,
    updatedAt: Date
}