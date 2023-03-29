import {WorkerType} from "~/models/enum/WorkerType";
import {UserModel} from "~/models/UserModel";
import {IModelWithId} from "~/models/IModelWithId";
export interface WorkerModel extends IModelWithId{

    phoneNumber: string,
    type: WorkerType[]
    carModel?: DriverCarModel
    userModel?: UserModel
}
