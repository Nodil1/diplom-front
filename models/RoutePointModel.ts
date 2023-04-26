import {IModel} from "~/models/IModel";
import {GpsPointModel} from "~/models/GpsPointModel";
import {TaskModel} from "~/models/TaskModel";
import {IModel} from "~/models/IModel";

export interface RoutePointModel extends IModel{
    gpsPoint: GpsPointModel
    taskModel?: TaskModel
    name: string
}