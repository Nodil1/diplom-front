import {RouteModel} from "~/models/RouteModel";
import {RepositoryTest} from "~/repositories/test/RepositoryTest";
import {IRouteRepository} from "~/repositories/intrefaces/IRouteRepository";
import {testDataRoutes} from "~/data/TestData";

export class RouteRepositoryTest extends RepositoryTest<RouteModel> implements IRouteRepository {

    constructor() {
        super(testDataRoutes)
    }

    async getWorkerRoutes(workerId: number): Promise<RouteModel[]> {
        return this.models.filter(x => x.worker.id === workerId)
    }
}