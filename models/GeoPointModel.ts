import {IModel} from "~/models/IModel";

export interface GeoPointModel extends IModel{
    latitude: number;
    longitude: number;
    createdAt: string;
    idWorker?: number | null;
}