import {TaskState} from "~/models/enum/TaskState";
import {states} from "~/data/consts";

export const taskStateToString = (state: TaskState) => {
    return states[state]
}

export const stringToTaskState = (str: string): TaskState => {
  return states.findIndex((x) => x === str)
}