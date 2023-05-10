import {IRepository} from "~/repositories/intrefaces/IRepository";
import {IModel} from "~/models/IModel";
import {ofetch} from "ofetch";

export abstract class RepositoryApi<T extends IModel> implements IRepository<T> {
    static apiUrl = "http://diplom-api/api/"
    path: string
    public static apiClient = ofetch.create({
        baseURL: this.apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })


    protected constructor(path: string) {
        this.path = path
    }

    delete(model: T): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getAll(): Promise<T[]> {
        return await RepositoryApi.apiClient(`${this.path}`,{
            method: 'GET'
        })
    }

    async getById(id: number): Promise<T> {
        return await RepositoryApi.apiClient(`${this.path}/${id}`,{
            method: 'GET'
        })
    }

    async update(model: T): Promise<void> {
        await RepositoryApi.apiClient(`${this.path}/${model.id}`,{
            method: 'PUT',
            body: JSON.stringify(model)
        })
    }

    async create(model: T): Promise<void> {
        return await RepositoryApi.apiClient(`${this.path}`,{
            method: 'POST',
            body: JSON.stringify(model)
        })
    }
}