export enum WorkerActionType{
    START_WORK,
    TAKE_PAUSE,
    END_PAUSE,
    TAKE_TASK,
    START_TASK,
    END_TASK,
    END_WORK
}

export const WorkerActionTypeStrings = {
    [WorkerActionType.START_WORK]: "Начало работы",
    [WorkerActionType.TAKE_PAUSE]: "Взял перерыв",
    [WorkerActionType.END_PAUSE]: "Закончил перерыв",
    [WorkerActionType.TAKE_TASK]: "Взял задачу",
    [WorkerActionType.START_TASK]: "Начал выполнять задачу",
    [WorkerActionType.END_TASK]: "Закончил выполнять задачу",
    [WorkerActionType.END_WORK]: "Закончил работу",
};