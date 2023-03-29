import {IRepository} from "~/repositories/intrefaces/IRepository";
import {RouteModel} from "~/models/RouteModel";

export interface IRouteRepository extends IRepository<RouteModel>{
    getWorkerRoutes(workerId: number): Promise<RouteModel[]>
}