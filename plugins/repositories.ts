import {DriverRepositoryTest} from "~/repositories/test/DriverRepositoryTest";
import {toast} from "vue3-toastify";

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            'driverRepo': new DriverRepositoryTest(),
        },
    };
})