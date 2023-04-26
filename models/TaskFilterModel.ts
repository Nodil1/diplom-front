import {TaskState} from "~/models/enum/TaskState";
import {TaskType} from "~/models/enum/TaskType";

export interface TaskFilterModel {
    states: TaskState[]
    types: TaskType[]
    search: string
}