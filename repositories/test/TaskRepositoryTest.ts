import {TaskRepository} from "~/repositories/intrefaces/TaskRepository";
import {TaskState} from "~/models/enum/TaskState";
import {TaskModel} from "~/models/TaskModel";
import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";

export class TaskRepositoryTest implements TaskRepository {
    tasks: TaskModel[] = [
        {
            id: 0,
            name: "Работа 1",
            description: "Срочно!",
            address: 'Лопатина 13',
            customer: "Валерик",
            latitude: 67.333,
            longitude: 123.333,
            state: TaskState.WAITING,
            createdAt: new Date(),
            expireAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 1,
            name: "Работа 1",
            description: "Срочно!",
            address: 'Лопатина 13',
            customer: "Слава",
            latitude: 67.333,
            longitude: 123.333,
            state: TaskState.IN_WORK,
            createdAt: new Date(),
            expireAt: new Date(),
            updatedAt: new Date(),
        }
    ]

    constructor() {
        (new DriverRepositoryTest()).getAll().then((worker) => {
            this.tasks[1].worker = worker[0]
        })
    }
    async getAll(): Promise<TaskModel[]> {
        return this.tasks;
    }

    async getById(id: number): Promise<TaskModel> {
        return this.tasks.find(x => x.id === id)!
    }

    createNew(model: TaskModel): void {
        this.tasks.push(model)
        console.log(this.tasks)
    }

    update(model: TaskModel): void {
        const idx = this.tasks.findIndex((x) => x.id === model.id)!
        this.tasks[idx] = model
        console.log(this.tasks)
    }

}