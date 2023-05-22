import {WorkerModel} from "~/models/WorkerModel";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {TaskModel} from "~/models/TaskModel";
import {WorkerScheduleModel} from "~/models/WorkerScheduleModel";

export interface WorkerRepository extends IRepository<WorkerModel>{
    notifyWorker(workerId: number, message: string): Promise<void>
    findTasksWhereWorkerId: (id: number) => Promise<TaskModel[]>
    getSchedule(workerId: number): Promise<WorkerScheduleModel[]>
    saveSchedule(schedule: WorkerScheduleModel): void
}