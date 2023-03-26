import {WorkerType} from "~/models/enum/WorkerType";
import {IModel} from "~/models/IModel";
export interface WorkerModel extends IModel{

    phoneNumber: string,
    type: WorkerType[]
    carModel?: DriverCarModel
    userModel?: UserModel
}
