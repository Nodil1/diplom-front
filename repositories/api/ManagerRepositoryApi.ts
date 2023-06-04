import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {ManagerRepository} from "~/repositories/intrefaces/ManagerRepository";
import {UserModel} from "~/models/UserModel";

export class ManagerRepositoryApi extends RepositoryApi<UserModel> implements ManagerRepository {
    constructor() {
        super("/manager")
    }
}