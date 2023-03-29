import {states} from "~/data/consts";

export enum TaskState {
    WAITING = 0,
    IN_WORK = 1,
    FINISHED = 2,
}
export  namespace TaskState {
    export const taskStateToString = (state: TaskState) => {
        return states[state]
    }
    export const stringToTaskState = (str: string): TaskState => {
        return states.findIndex((x) => x === str)
    }
}


