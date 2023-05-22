import {TaskState} from "~/models/enum/TaskState";
import {TaskType} from "~/models/enum/TaskType";
import {WorkerModel} from "~/models/WorkerModel";
import {IModel} from "~/models/IModel";

export interface TaskModel extends IModel{
    name: string,
    description: string,
    address: string,
    customer: string,
    taskType: TaskType[]
    latitude: number,
    longitude: number,
    state: TaskState,
    createdAt?: string,
    expireAt: string,
    updatedAt?: string,
    worker?: WorkerModel,
    finishedAt?: string,
    parentTask?: TaskModel

}