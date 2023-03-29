import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";
import {TaskRepositoryTest} from "~/repositories/test/TaskRepositoryTest";
import {RouteRepositoryTest} from "~/repositories/test/RouteRepositoryTest";

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            'driverRepo': new DriverRepositoryTest(),
            'taskRepo': new TaskRepositoryTest(),
            'routeRepo': new RouteRepositoryTest()
        },
    };
})