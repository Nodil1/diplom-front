import {SettingsRepository} from "~/repositories/intrefaces/SettingsRepository";
import {RepositoryApi} from "~/repositories/api/RepositoryApi";
import {SettingsModel} from "~/models/SettingsModel";

export class SettingsRepositoryApi extends RepositoryApi<SettingsModel> implements SettingsRepository  {
    constructor() {
        super("/settings")
    }
    async getSettings(): Promise<SettingsModel> {
        let req = await RepositoryApi.apiClient(`${this.path}`,{
            method: 'GET',
        })
        
        return req
    }
}