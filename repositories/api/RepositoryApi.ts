import {IRepository} from "~/repositories/intrefaces/IRepository";
import {IModel} from "~/models/IModel";
import {FetchContext, FetchResponse, ofetch} from "ofetch";
import Pusher from 'pusher-js';

export abstract class RepositoryApi<T extends IModel> implements IRepository<T> {
    static apiUrl = "https://diplom.application-on.ru/api/"
    public static pusher?: Pusher = undefined


    path: string
    public static apiClient = ofetch.create({
        baseURL: this.apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })


    protected constructor(path: string) {
        this.path = path

        if (RepositoryApi.pusher === undefined) {
            RepositoryApi.pusher = new Pusher("app-key", {
                cluster: "mt1",
                wsHost: "diplom.application-on.ru",
            });
            RepositoryApi.pusher.connect()
            console.log(RepositoryApi.pusher)
            RepositoryApi.pusher.connection.bind('error', function (err: any) {
                console.log(err);
            });
            RepositoryApi.pusher.connection.bind('connected', function () {
                console.log("OK");
            });
        }

    }

    delete(model: T): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getAll(): Promise<T[]> {
        return await RepositoryApi.apiClient(`${this.path}`, {
            method: 'GET'
        })
    }

    async getById(id: number): Promise<T> {
        return await RepositoryApi.apiClient(`${this.path}/${id}`, {
            method: 'GET'
        })
    }

    async update(model: T): Promise<void> {
        await RepositoryApi.apiClient(`${this.path}/${model.id}`, {
            method: 'PUT',
            body: JSON.stringify(model)
        })
    }

    async create(model: T): Promise<void> {
        return await RepositoryApi.apiClient(`${this.path}`, {
            method: 'POST',
            body: JSON.stringify(model)
        })
    }
}