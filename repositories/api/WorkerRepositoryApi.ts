import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {WorkerModel} from "~/models/WorkerModel";
import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";
import {TaskRepository} from "~/repositories/intrefaces/TaskRepository";
import {WorkerRepository} from "~/repositories/intrefaces/WorkerRepository";
import {TaskModel} from "~/models/TaskModel";
import {WorkerScheduleModel} from "~/models/WorkerScheduleModel";

export class WorkerRepositoryApi extends RepositoryApi<WorkerModel> implements WorkerRepository {
    constructor() {
        super("/worker")
    }

    async findTasksWhereWorkerId(id: number): Promise<TaskModel[]> {
        let req = await RepositoryApi.apiClient(`${this.path}/${id}/tasks`, {
            method: 'GET',
        })
        console.log(req)
        return req
    }

    async notifyWorker(workerId: number, message: string): Promise<void> {
        let req = await RepositoryApi.apiClient(`${this.path}/${workerId}/notify`, {
            params: {
                message: message
            },
            method: 'POST',
        })
        console.log(req)
        return req
    }

    async getSchedule(workerId: number): Promise<WorkerScheduleModel[]> {
        let req = await RepositoryApi.apiClient(`${this.path}/${workerId}/schedule`, {
            method: 'GET',
        })
        console.log(req)
        return req
    }

    async saveSchedule(schedule: WorkerScheduleModel): Promise<void> {
        let req = await RepositoryApi.apiClient(`${this.path}/${schedule.idWorker}/schedule`, {
            body: schedule,
            method: 'POST',
        })
        console.log(req)
    }


}