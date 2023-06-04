import {WorkerType} from "~/models/enum/WorkerType";
import {TaskType} from "~/models/enum/TaskType";
import {TaskState} from "~/models/enum/TaskState";
import {GeoPointModel} from "~/models/GeoPointModel";
import {RoutePointModel} from "~/models/RoutePointModel";
import {RouteModel} from "~/models/RouteModel";

export const testDataWorker = [
    {
        id: 1,
        carModel: {
            carBrand: "Лада",
            carModel: "2112",
            carNumber: "У257РВ",
        },
        phoneNumber: "+79190050411",
        userModel: {
            id: 1, login: "Vasya", createdAt: "13.01.2002", fio: "Борисов Н.В.", isOnline: true
        },
        type: [WorkerType.MEASURER]

    },
    {
        id: 2,
        carModel: {
            carBrand: "Ниссан",
            carModel: "Альмера",
            carNumber: "К820РМ33",
        },
        phoneNumber: "+79190050323",
        userModel: {
            id: 2, login: "Андрей", createdAt: "22.01.2002", fio: "Маликов Н.В.", isOnline: false
        },
        type: [WorkerType.COURIER]
    },
]
export const testDataTasks = [
    {
        id: 0,
        name: "Работа 1",
        description: "Срочно!",
        address: 'Лопатина 13',
        customer: "Валерий",
        latitude: 67.333,
        worker: testDataWorker[0],
        longitude: 123.333,
        taskType: [TaskType.INSTALLATION, TaskType.DELIVERY],
        state: TaskState.WAITING,
        createdAt: new Date(),
        expireAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "Сборка мебели",
        description: "Срочно!",
        address: 'Ленина 11',
        customer: "Дмитрий",
        latitude: 67.333,
        longitude: 123.333,
        taskType: [TaskType.INSTALLATION],
        state: TaskState.IN_WORK,
        createdAt: new Date(),
        expireAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 1,
        name: "Замер для шкафа",
        description: "Замерить место для шкафа",
        address: 'Мира 22',
        customer: "Андрей Р.С.",
        latitude: 67.333,
        longitude: 123.333,
        worker: testDataWorker[1],
        taskType: [TaskType.MEASURE],
        state: TaskState.IN_WORK,
        createdAt: new Date(),
        expireAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        name: "Замер кухни",
        description: "Замер для кухонной гарнитуры",
        address: 'Северная 27',
        customer: "Антон",
        latitude: 67.333,
        longitude: 123.333,
        taskType: [TaskType.MEASURE],
        state: TaskState.IN_WORK,
        worker: testDataWorker[1],
        createdAt: new Date(),
        expireAt: new Date(),
        updatedAt: new Date(),
    },

]

export const testDataGpsPoint: GeoPointModel[] = [
    {
        id: 0,
        latitude: 67.333,
        longitude: 68.333
    },
    {
        id: 1,
        latitude: 67.333,
        longitude: 68.35
    },
    {
        id: 2,
        latitude: 67.32,
        longitude: 68.354
    }
]

export const testDataRoutePoint: RoutePointModel[] = [
    {
        id: 0,
        gpsPoint: testDataGpsPoint[0],
        taskModel: testDataTasks[0],
        name: testDataTasks[0].name
    }
]

export const testDataRoutes: RouteModel[] = [
    {
        routePoints: testDataRoutePoint,
        gpsPoints: testDataGpsPoint,
        worker: testDataWorker[0]
    }
]