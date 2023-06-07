import {TaskModel} from "~/models/TaskModel";
import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {TaskRepository} from "~/repositories/intrefaces/TaskRepository";
import {TaskAttachmentModel} from "~/models/TaskAttachementModel";
import {WorkerActionModel} from "~/models/WorkerActionModel";

export class TaskRepositoryApi extends RepositoryApi<TaskModel> implements TaskRepository {
    constructor() {
        super("/task")
    }


    async getAttachments(idTask: number): Promise<TaskAttachmentModel[]> {
        let req = await RepositoryApi.apiClient(`${this.path}/${idTask}/attachments`,{
            params: {

            },
            method: 'GET',
        })
        
        return req
    }

    async getActions(idTask: number): Promise<WorkerActionModel[]> {
        let req = await RepositoryApi.apiClient(`${this.path}/${idTask}/actions`,{
            params: {

            },
            method: 'GET',
        })
        
        return req
    }

    async getTaskForPeriod(from: Date, to: Date): Promise<TaskModel[]> {

        let req = await RepositoryApi.apiClient(`${this.path}`,{
            params: {
                from: from.toISOString(),
                to: to.toISOString()
            },
            method: 'GET',
        })
        
        return req
    }
}