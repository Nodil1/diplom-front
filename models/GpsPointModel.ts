import {IModel} from "~/models/IModel";
import {IModelWithId} from "~/models/IModelWithId";

export interface GpsPointModel extends IModelWithId{
    latitude: number;
    longitude: number;
}