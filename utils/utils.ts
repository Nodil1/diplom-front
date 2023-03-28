import {TaskState} from "~/models/enum/TaskState";
import {states, taskTypes, workerTypes} from "~/data/consts";
import {TaskType} from "~/models/enum/TaskType";
import {TaskModel} from "~/models/TaskModel";

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

export const filterTasks = (tasks: TaskModel[], type: TaskType[], state: TaskState[]) => {

}