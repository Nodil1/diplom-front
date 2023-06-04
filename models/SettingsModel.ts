import {IModel} from "~/models/IModel";

export interface SettingsModel extends IModel{
    appToken: string;
    automated: number;
    geoDelay: number;
    geoDistance: number;
}