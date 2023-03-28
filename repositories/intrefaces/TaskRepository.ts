import {TaskModel} from "~/models/TaskModel";
import {IRepository} from "~/repositories/intrefaces/IRepository";

export interface TaskRepository extends IRepository<TaskModel>{
    findTasksWhereWorkerId: (id: number) => Promise<TaskModel[]>
}