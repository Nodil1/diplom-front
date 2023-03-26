import {TaskState} from "~/models/enum/TaskState";
import {states, taskTypes, workerType, workerTypes} from "~/data/consts";
import {TaskType} from "~/models/enum/TaskType";

export const taskStateToString = (state: TaskState) => {
    return states[state]
}

export const stringToTaskState = (str: string): TaskState => {
    return states.findIndex((x) => x === str)
}


export const taskTypeToString = (state: TaskType) => {
    return taskTypes[state]
}

export const workerTypeToString = (type: WorkerType) => {
    return workerTypes[type]
}