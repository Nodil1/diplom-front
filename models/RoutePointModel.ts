import {IModel} from "~/models/IModel";
import {GpsPointModel} from "~/models/GpsPointModel";
import {TaskModel} from "~/models/TaskModel";
import {IModelWithId} from "~/models/IModelWithId";

export interface RoutePointModel extends IModelWithId{
    gpsPoint: GpsPointModel
    taskModel?: TaskModel
    name: string
}