import {TaskState} from "~/models/enum/TaskState";
import {TaskType} from "~/models/enum/TaskType";
import {WorkerModel} from "~/models/WorkerModel";
import {IModelWithId} from "~/models/IModelWithId";

export interface TaskModel extends IModelWithId{
    name: string,
    description: string,
    address: string,
    customer: string,
    taskType: TaskType[]
    latitude: number,
    longitude: number,
    state: TaskState,
    createdAt: Date,
    expireAt: Date,
    updatedAt: Date,
    worker?: WorkerModel,
    finishedAt?: Date,
    parentTask?: TaskModel

}