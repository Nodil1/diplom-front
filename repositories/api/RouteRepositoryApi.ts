import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRouteRepository} from "~/repositories/intrefaces/IRouteRepository";
import {RouteModel} from "~/models/RouteModel";
import {GeoPointModel} from "~/models/GeoPointModel";

export class RouteRepositoryApi extends RepositoryApi<RouteModel> implements IRouteRepository {
    constructor() {
        super("/route")
    }

    subscribeOnWorkerGeoUpdates(idWorker: number, onEvent: (event: GeoPointModel) => void): void {
        if (RepositoryApi.pusher !== undefined){
            const channel = RepositoryApi.pusher.subscribe('workerGeo.' + idWorker);
            channel.bind('NewGeo', function (data: { geoPoint: GeoPointModel; }) {
                onEvent(data.geoPoint)
            });

        }

    }
    async getWorkerRoutes(workerId: number, date: string): Promise<RouteModel[]> {
        return await RepositoryApi.apiClient(`${this.path}`, {
            params: {
                idWorker: workerId,
                date: date
            },
            method: 'GET',
        })
    }

    async getWorkerRoutesBetween(workerId: number, from: string, to: string): Promise<RouteModel[]> {
        return await RepositoryApi.apiClient(`${this.path}`, {
            params: {
                idWorker: workerId,
                from: from,
                to: to
            },
            method: 'GET',
        })
    }
}