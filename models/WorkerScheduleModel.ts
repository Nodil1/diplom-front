import {IModel} from "~/models/IModel";

export  interface WorkerScheduleModel extends IModel {
    idWorker: number;
    day: number;
    isActive: number;
    from: string;
    to: string;
}