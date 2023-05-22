import {IRepository} from "~/repositories/intrefaces/IRepository";
import {RouteModel} from "~/models/RouteModel";
import {GeoPointModel} from "~/models/GeoPointModel";

export interface IRouteRepository extends IRepository<RouteModel>{
    getWorkerRoutes(workerId: number, date: string): Promise<RouteModel[]>
    getWorkerRoutesBetween(workerId: number, from: string, to: string): Promise<RouteModel[]>

    subscribeOnWorkerGeoUpdates(idWorker: number,onEvent: ()=> GeoPointModel): void
}