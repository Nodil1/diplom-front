import {TaskModel} from "~/models/TaskModel";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {TaskAttachmentModel} from "~/models/TaskAttachementModel";
import {WorkerActionModel} from "~/models/WorkerActionModel";

export interface TaskRepository extends IRepository<TaskModel>{
    getAttachments: (idTask: number) => Promise<TaskAttachmentModel[]>
    getActions(idTask: number): Promise<WorkerActionModel[]>
    getTaskForPeriod(from: Date, to: Date): Promise<TaskModel[]>
}