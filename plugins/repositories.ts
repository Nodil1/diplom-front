import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";
import {TaskRepositoryTest} from "~/repositories/test/TaskRepositoryTest";
import {RouteRepositoryTest} from "~/repositories/test/RouteRepositoryTest";
import {WorkerRepositoryApi} from "~/repositories/api/WorkerRepositoryApi";
import {TaskRepositoryApi} from "~/repositories/api/TaskRepositoryApi";
import {RouteRepositoryApi} from "~/repositories/api/RouteRepositoryApi";
import {AuthRepositoryApi} from "~/repositories/api/AuthRepositoryApi";
import {ManagerRepositoryApi} from "~/repositories/api/ManagerRepositoryApi";
import {SettingsRepositoryApi} from "~/repositories/api/SettingsRepositoryApi";

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            'driverRepo': new WorkerRepositoryApi(),
            'taskRepo': new TaskRepositoryApi(),
            'routeRepo': new RouteRepositoryApi(),
            'authRepo': new AuthRepositoryApi(),
            'managerRepo': new ManagerRepositoryApi(),
            'settingsRepo': new SettingsRepositoryApi(),
        },
    };
})