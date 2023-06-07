import {GeoPointModel} from "~/models/GeoPointModel";
import {RouteModel} from "~/models/RouteModel";
import {WorkerActionType} from "~/models/enum/WorkerActionType";
import {TaskModel} from "~/models/TaskModel";

export function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
}

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Радиус Земли в километрах
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Расстояние в километрах
    return d;
}

export function getTotalDistance(geoPoints: GeoPointModel[]): number {
    let distance = 0;
    for (let i = 0; i < geoPoints.length - 1; i++) {
        const lat1 = geoPoints[i].latitude;
        const lat2 = geoPoints[i + 1].latitude;
        const lon1 = geoPoints[i].longitude;
        const lon2 = geoPoints[i + 1].longitude;
        distance += getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    }
    return distance;
}

export function travelTime(routes: RouteModel[]): number {
    const travelRoute = routes.filter((route) => route.start.type === WorkerActionType.TAKE_TASK && route.end !== null);
    return meanTime(travelRoute)

}

export function taskTime(routes: RouteModel[]): number {
    const travelRoute = routes.filter((route) => route.start.type === WorkerActionType.START_TASK && route.end !== null);
    return meanTime(travelRoute)
}

export function meanTime(routes: RouteModel[]): number {
    const datesArray = routes.map((x) => [new Date(x.start.createdAt!!), new Date(x.end!!.createdAt!!)]);
    let totalTime = 0;

    datesArray.forEach((dates) => {
        const [startDate, endDate] = dates;
        const diffInMinutes = (endDate.getTime() - startDate.getTime()) / 60000;
        totalTime += diffInMinutes;
    });

    return totalTime / datesArray.length;
}

export function finishedTask(routes: RouteModel[]): number {
    const travelRoute = routes.filter((route) => route.start.type === WorkerActionType.START_TASK && route.end !== null);
    return travelRoute.length
}

export function fillDateLabels(from: Date, to: Date) {
    const acc: { [key: string]: number } = {}
    let currentDate = new Date(from);
    while (currentDate <= to) {
        const dateStr = new Date(currentDate).toLocaleDateString()
        if (!Object.keys(acc).includes(dateStr)) {
            acc[dateStr] = 0;
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return acc
}

export function cutDateLabels(obj: { [key: string]: number }) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        const newKey = key.substring(0, key.length - 5);
        obj[newKey] = obj[key];
        delete obj[key];
    });
}

export function taskDateCount(tasks: TaskModel[], from: Date, to: Date, idWorker: number | null = null) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    tasks.forEach((obj) => {
        if (idWorker !== null && obj.worker?.id !== idWorker) {
            return
        }
        const dateStr = new Date(obj.createdAt!!).toLocaleDateString()
        acc[dateStr] = (acc[dateStr] || 0) + 1; // увеличиваем значение для ключа, соответствующего текущей дате, или создаем новый ключ со значением 1
    });
    cutDateLabels(acc)
    return acc
}

export function taskDateCountFinished(tasks: TaskModel[], from: Date, to: Date, idWorker: number | null = null) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    tasks.forEach((obj) => {
        if (idWorker !== null && obj.worker?.id !== idWorker) {
            return
        }
        const dateStr = new Date(obj.createdAt!!).toLocaleDateString()
        if (obj.finishedAt !== null) {
            const finishedStr = new Date(obj.finishedAt!!).toLocaleDateString()
            acc[finishedStr] = (acc[finishedStr] || 0) + 1;
        }
    });
    cutDateLabels(acc)
    return acc
}

export function taskDateCountFinishedOnTime(tasks: TaskModel[], from: Date, to: Date) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    Object.keys(acc).forEach((key) => {
        tasks.forEach((obj) => {
            if (obj.finishedAt === null) {
                return
            }
            const taskDate = new Date(obj.createdAt!!).toLocaleDateString()
            const keyDate = new Date(key).toLocaleDateString()
            const expireDate = new Date(obj.expireAt!!).toLocaleDateString()
            const finishDate = new Date(obj.finishedAt!!).toLocaleDateString()

            if (keyDate === taskDate && expireDate === finishDate) {
                acc[key] = (acc[key] || 0) + 1;
            }
        });
    })
    cutDateLabels(acc)
    return acc
}

export function mileageStats(routes: RouteModel[], from: Date, to: Date) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    Object.keys(acc).forEach((key) => {
        routes.forEach((obj) => {
            const startDate = new Date(obj.start.createdAt!!).toLocaleDateString()
            
            if (startDate === key) {
                acc[key] += roundNumber(getTotalDistance(obj.points), 2)
            }
        })
    })
    cutDateLabels(acc)
    return acc
}

export function taskDateCountFinishedNotOnTime(tasks: TaskModel[], from: Date, to: Date) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    tasks.forEach((obj) => {
        if (obj.finishedAt === null) {
            return
        }
        const expireDate = new Date(obj.expireAt!!).toLocaleDateString()
        const finishDate = new Date(obj.finishedAt!!).toLocaleDateString()

        if (expireDate !== finishDate) {
            acc[finishDate] = (acc[finishDate] || 0) + 1;
        }
    });
    cutDateLabels(acc)

    return acc
}

export function workerTaskStats(tasks: TaskModel[]) {
    return tasks.reduce((acc: { [key: string]: number }, obj) => {
        if (obj.worker !== null && obj.finishedAt === null) {
            acc[obj.worker!!.userModel!!.fio] = (acc[obj.worker!!.userModel!!.fio] || 0) + 1;
        }
        return acc;
    }, {});
}

export function taskCompletedStats(tasks: TaskModel[]) {
    return tasks.reduce((acc: { [key: string]: number }, obj) => {
        if (obj.finishedAt !== null) {
            acc[obj.worker!!.userModel!!.fio] = (acc[obj.worker!!.userModel!!.fio] || 0) + 1;
        }
        return acc;
    }, {});
}

export function mileageStatistics(routes: RouteModel[], from: Date, to: Date) {
    const acc: { [key: string]: number } = fillDateLabels(from, to)
    routes.forEach((route) => {
        const dateStr = new Date(route.start.createdAt!!).toLocaleDateString()
        if (!Object.keys(acc).includes(dateStr)) {
            acc[dateStr] = 0;
        }
        acc[dateStr] += getTotalDistance(route.points)
    });
    cutDateLabels(acc)
    return acc
}