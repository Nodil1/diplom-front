import {WorkerType} from "~/models/enum/WorkerType";
import {WorkerModel} from "~/models/WorkerModel";
import {RepositoryTest} from "~/repositories/test/RepositoryTest";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {WorkerRepository} from "~/repositories/intrefaces/WorkerRepository";
import {testDataWorker} from "~/data/TestData";

export class DriverRepositoryTest extends RepositoryTest<WorkerModel> implements WorkerRepository {

    constructor() {
        super(testDataWorker);
    }
    
}