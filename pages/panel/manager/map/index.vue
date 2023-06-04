<template>
    <div class="map-container">
        <ClientOnly>
            <l-map ref="map"
                   v-model:zoom="zoom"
                   :center="[56.1414144,40.419328]"
                   :use-global-leaflet="false">
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                ></l-tile-layer>

                <l-marker v-for="location in workerLocation"
                          :lat-lng="getLastLocation(location.routes)"
                >
                    <LPopup>
                        <p>{{ location.worker.userModel.fio }}</p>
                        <NuxtLink :to="`/panel/manager/worker/${location.worker.id}`">Посмотреть</NuxtLink>

                    </LPopup>
                    <LIcon
                        :icon-size="[50, 50]"
                        :icon-url="driverIcon"></LIcon>
                </l-marker>
                <l-marker v-for="task in tasks"
                          :lat-lng="[task.latitude, task.longitude]"
                >
                    <LPopup>
                        <p>Задание: {{ task.name }}</p>
                        <p>Выполнить до: {{task.expireAt}}</p>
                        <NuxtLink :to="`/panel/manager/task/${task.id}`">Посмотреть</NuxtLink>
                    </LPopup>
                    <LIcon
                        :icon-size="[50, 50]"
                        :icon-url="taskIcon"></LIcon>
                </l-marker>
            </l-map>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import {driverIcon, taskIcon} from "~/data/consts";

interface WorkerLocation {
    worker: WorkerModel;
    routes: RouteModel[];
}
import {LIcon, LMap, LMarker, LPopup, LTileLayer} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import {Ref} from "vue";
import {WorkerModel} from "~/models/WorkerModel";
import {RouteModel} from "~/models/RouteModel";
import {TaskModel} from "~/models/TaskModel";

const zoom = ref(10)
const workerRepository = useNuxtApp().$driverRepo
const routeRepository = useNuxtApp().$routeRepo
const taskRepository = useNuxtApp().$taskRepo

const workers: Ref<WorkerModel[]> = ref(await workerRepository.getAll())
const tasks: Ref<TaskModel[]> = ref(await taskRepository.getAll())
const workerLocation: Ref<WorkerLocation[]> = ref([]);
for (const worker of workers.value) {
    const routes = await routeRepository.getWorkerRoutes(worker.id!!, (new Date()).toISOString());
    if (routes.length > 0) {
        workerLocation.value.push({
            "worker": worker,
            "routes": routes
        });
    }
}
const getLastLocation = (routes: RouteModel[]) => {
    console.log(routes)
    console.log(routes[routes.length - 1])
    console.log(routes[routes.length - 1])
    return [
        routes[routes.length - 1].points[routes[routes.length - 1].points.length - 1].latitude,
        routes[routes.length - 1].points[routes[routes.length - 1].points.length - 1].longitude,
    ]
}
</script>

<style>
.map-container {
    height: 100vh;
    width: 100vw;
}
</style>