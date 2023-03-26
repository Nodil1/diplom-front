import {TaskModel} from "~/models/TaskModel";

export interface TaskRepository {
    getAll: () => Promise<TaskModel[]>
    getById: (id: number) => Promise<TaskModel>

    createNew: (model: TaskModel) => Promise<void>
    update: (model: TaskModel) => Promise<void>
    whereWorkerId: (id: number) => Promise<TaskModel[]>
}