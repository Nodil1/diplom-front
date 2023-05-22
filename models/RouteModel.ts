import {GeoPointModel} from "~/models/GeoPointModel";
import {WorkerModel} from "~/models/WorkerModel";
import {IModel} from "~/models/IModel";
import {WorkerActionModel} from "~/models/WorkerActionModel";

export interface RouteModel extends IModel{
    startGeo: GeoPointModel;
    endGeo?: GeoPointModel | null;
    points: Array<GeoPointModel>;
    start: WorkerActionModel;
    end?: WorkerActionModel | null;
}