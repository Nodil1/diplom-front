import {IModel} from "~/models/IModel";
import {WorkerModel} from "~/models/WorkerModel";

export interface WorkerActionModel extends IModel {
    worker: WorkerModel;
    type: number;
    idTask?: number | null;
    createdAt?: string | null;
}