import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {WorkerModel} from "~/models/WorkerModel";
import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";

export class WorkerRepositoryApi extends RepositoryApi<WorkerModel> implements IRepository<WorkerModel> {
    constructor() {
        super("/worker")
    }


}