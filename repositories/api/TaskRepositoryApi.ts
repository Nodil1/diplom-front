import {TaskModel} from "~/models/TaskModel";
import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {TaskRepository} from "~/repositories/intrefaces/TaskRepository";

export class TaskRepositoryApi extends RepositoryApi<TaskModel> implements TaskRepository {
    constructor() {
        super("/task")
    }

    findTasksWhereWorkerId(id: number): Promise<TaskModel[]> {
        return Promise.resolve([]);
    }
}