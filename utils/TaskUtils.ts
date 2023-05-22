import {WorkerScheduleModel} from "~/models/WorkerScheduleModel";

export function checkTimeScheduleCollision(taskTime: Date, schedule: WorkerScheduleModel[]) {
    const taskDayOfWeek = (taskTime.getDay() + 6) % 7 + 1;
    const scheduleDayOfWeek = schedule[taskDayOfWeek]
    if (scheduleDayOfWeek.isActive === 0){
        return false
    }
    const scheduleFrom = new Date(taskTime)
    scheduleFrom.setHours(parseInt(scheduleDayOfWeek.from.split(":")[0]),
        parseInt(scheduleDayOfWeek.from.split(":")[1]))
    const scheduleTo = new Date(taskTime)
    scheduleTo.setHours(parseInt(scheduleDayOfWeek.to.split(":")[0]),
        parseInt(scheduleDayOfWeek.to.split(":")[1]))
    return taskTime >= scheduleFrom && taskTime <= scheduleTo;

}

export function isWorkerBusy(taskDate: Date, workerTaskDates: Date[]): boolean {
    for (const workerTaskDate of workerTaskDates) {
        const timeDiffInMinutes = Math.abs(taskDate.getTime() - workerTaskDate.getTime()) / (1000 * 60);
        if (timeDiffInMinutes < 30) {
            return true;
        }
    }
    return false;
}