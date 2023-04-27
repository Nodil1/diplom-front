import {TaskModel} from "~/models/TaskModel";
import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRepository} from "~/repositories/intrefaces/IRepository";

export class TaskRepositoryApi extends RepositoryApi<TaskModel> implements IRepository<TaskModel> {
    constructor() {
        super("/task")
    }
}