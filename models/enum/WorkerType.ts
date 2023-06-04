import {WorkerActionType} from "~/models/enum/WorkerActionType";

export enum WorkerType{
    MEASURER,
    COURIER,
    COLLECTOR,
}

export const WorkerTypeStrings = {
    [WorkerType.MEASURER]: "Замерщик",
    [WorkerType.COURIER]: "Курьер",
    [WorkerType.COLLECTOR]: "Сборщик",

};