import {IRepository} from "~/repositories/intrefaces/IRepository";
import {IModel} from "~/models/IModel";

export class RepositoryTest<T extends IModel> implements IRepository<T> {
    models: T[]

    constructor(models: T[]) {
        this.models = models
    }

    async delete(model: T): Promise<void> {
        delete this.models[this.models.findIndex((x) => x.id === model.id)]
    }

    async getAll(): Promise<T[]> {
        return this.models
    }

    async getById(id: number): Promise<T> {
        return this.models.find((x) => x.id === id)!
    }

    update(model: T): Promise<void> {
        return Promise.resolve(undefined);
    }
}