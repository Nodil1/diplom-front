import {RouteModel} from "~/models/RouteModel";
import {IRouteRepository} from "~/repositories/intrefaces/IRouteRepository";
import {UserModel} from "~/models/UserModel";
import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {AuthRepository} from "~/repositories/intrefaces/AuthRepository";

export class AuthRepositoryApi extends RepositoryApi<UserModel> implements AuthRepository {
    constructor() {
        super("/auth")
    }

    async login(login: string, password: string): Promise<void> {
        const reg = await RepositoryApi.apiClient(`${this.path}`, {
            params: {
                login: login,
                password: password
            },
            method: 'GET',
        })
        useCookie("token").value = reg.token
    }

}