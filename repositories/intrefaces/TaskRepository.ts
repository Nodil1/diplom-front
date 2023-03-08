import {TaskModel} from "~/models/TaskModel";

export interface TaskRepository {
    getAll: () => Promise<TaskModel[]>
    getById: (id: number) => Promise<TaskModel>

    createNew: (model: TaskModel) => void
    update: (model: TaskModel) => void
}