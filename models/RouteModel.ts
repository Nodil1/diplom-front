import {GpsPointModel} from "~/models/GpsPointModel";
import {RoutePointModel} from "~/models/RoutePointModel";
import {WorkerModel} from "~/models/WorkerModel";
import {IModel} from "~/models/IModel";

export interface RouteModel extends IModel{
    gpsPoints: GpsPointModel[];
    routePoints: RoutePointModel[];
    worker: WorkerModel;
}