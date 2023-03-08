import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";
import {TaskRepositoryTest} from "~/repositories/test/TaskRepositoryTest";

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            'driverRepo': new DriverRepositoryTest(),
            'taskRepo': new TaskRepositoryTest()
        },
    };
})