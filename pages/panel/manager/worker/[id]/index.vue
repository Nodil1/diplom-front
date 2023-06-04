<template>
    <div class="page-margin">
        <div class="d-flex align-center">
            <h2 class="margin-right">Профиль работника {{ worker.userModel.fio }}</h2>
            <OnlineIndicator :is-online="worker.userModel.isOnline"/>
        </div>
        <NuxtLink class="margin-right" :to="`/panel/manager/worker/${worker.id}/stats`">
            <v-btn color="blue" class="margin-top">Статистика</v-btn>
        </NuxtLink>
        <v-btn color="blue" class="margin-top margin-right">
            Сообщение
            <v-dialog
                width="500"
                v-model="notifyDialog"
                activator="parent"
            >
                <div class="main-container notify-dialog">
                    <h4>Сообщение работнику</h4>
                    <v-text-field v-model="notifyMsg">

                    </v-text-field>
                    <v-btn color="blue" class="margin-top" @click="sendNotify">Отправить</v-btn>

                </div>
            </v-dialog>
        </v-btn>
        <v-btn color="blue" class="margin-top">
            График работы
            <v-dialog
                v-model="scheduleDialog"
                activator="parent"
                width="500">
                <WorkSchedule :id-worker="idWorker"/>
            </v-dialog>
        </v-btn>
        <v-row>
            <v-col cols="12" md="3" class="margin-top d-flex flex-column justify-space-between">
                <div class="main-container flex-grow-1 d-flex flex-column justify-space-between">
                    <div class="d-flex main-gap ">
                        <v-icon icon="mdi-map-marker-distance"></v-icon>
                        <p>Километраж: {{roundNumber(getTotalDistance(getFullPoints()),2)}} км.</p>
                    </div>
                    <div class="d-flex main-gap">
                        <v-icon icon="mdi-map-marker-distance"></v-icon>
                        <p>Среднее время в пути: {{roundNumber(getTotalDistance(getFullPoints()),2)}} км.</p>
                    </div>
                    <div class="d-flex main-gap">
                        <v-icon icon="mdi-map-marker-distance"></v-icon>
                        <p>Среднее время выполнения: {{roundNumber(getTotalDistance(getFullPoints()),2)}} км.</p>
                    </div>
                    <div class="d-flex main-gap">
                        <v-icon icon="mdi-map-marker-distance"></v-icon>
                        <p>Выполненых заданий: {{roundNumber(getTotalDistance(getFullPoints()),2)}} км.</p>
                    </div>
                    <div class="d-flex main-gap">
                        <v-icon icon="mdi-map-marker-distance"></v-icon>
                        <p>Всего заданий: {{roundNumber(getTotalDistance(getFullPoints()),2)}} км.</p>
                    </div>
                </div>
                <v-date-picker class="full-width margin-top" v-model="date"/>

            </v-col>
            <v-col>
                <div class="map main-container margin-top" v-if="mapReady">
                    <ClientOnly>
                        <l-map ref="map" v-model:zoom="zoom"
                               :center="[56.1414144,40.419328]"
                               :use-global-leaflet="false">
                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                layer-type="base"
                                name="OpenStreetMap"
                            ></l-tile-layer>
                            <LPolyline
                                v-for="route in routes"
                                :lat-lngs="getPoints(route)"
                            />
                            <l-marker :lat-lng="lastLocation" v-if="lastLocation !== null">
                                <LPopup>
                                    <p>{{ lastLocation }}</p>
                                </LPopup>
                                <LIcon
                                    :icon-size="[25, 41]"
                                    :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'"></LIcon>
                            </l-marker>
                            <l-marker v-for="route in routes"
                                      :lat-lng="[route.startGeo.latitude, route.startGeo.longitude]">
                                <LPopup>
                                    <p>{{ "D" }}</p>
                                </LPopup>
                                <LIcon
                                    :icon-size="[25, 41]"
                                    :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"></LIcon>
                            </l-marker>
                        </l-map>
                    </ClientOnly>
                </div>

            </v-col>
        </v-row>
        <div class="main-container margin-top">
            <h4>Задачи</h4>
            <v-row>
                <v-col md="4" v-for="task in tasks">
                    <TaskItem :task-model="task" :key="task.id"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TaskItem from "~/components/panel/manager/TaskItem.vue";
import {Ref} from "vue";
import {TaskModel} from "~/models/TaskModel";
import {LMarker, LMap, LTileLayer, LIcon, LPopup, LPolyline} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import {useNuxtApp} from "#app";
import {WorkerModel} from "~/models/WorkerModel";
import {RouteModel} from "~/models/RouteModel";
import {GeoPointModel} from "~/models/GeoPointModel";
import OnlineIndicator from "~/components/panel/manager/OnlineIndicator.vue";
import WorkSchedule from "~/components/panel/manager/WorkSchedule.vue";
import {roundNumber} from "~/utils/utils";

definePageMeta({
    layout: 'default',
});

const idWorker = parseInt(useRoute().params.id as string)
const workerRepo = useNuxtApp().$driverRepo
const worker: Ref<WorkerModel> = ref(await useNuxtApp().$driverRepo.getById(idWorker))
const taskRepo = useNuxtApp().$taskRepo
const routeRepo = useNuxtApp().$routeRepo
const showLine = ref(true)
const notifyDialog = ref(false)
const notifyMsg = ref("")
const scheduleDialog = ref(false)
const date = ref(new Date())
const routes: Ref<RouteModel[]> = ref((await routeRepo.getWorkerRoutes(idWorker, date.value.toISOString())))

const mapReady = ref(false)
const zoom = ref(10)
const lastLocation: Ref<null | number[]> = ref(null)
try {
    lastLocation.value = routes.value.length > 0 ? [
        routes.value[routes.value.length - 1].points[routes.value[routes.value.length - 1].points.length - 1].latitude,
        routes.value[routes.value.length - 1].points[routes.value[routes.value.length - 1].points.length - 1].longitude,
    ] : null
} catch (e) {

}

routeRepo.subscribeOnWorkerGeoUpdates(idWorker, (geoPoint: GeoPointModel) => {
    console.log(geoPoint)
    lastLocation.value = [geoPoint.latitude, geoPoint.longitude]
    routes.value[routes.value.length - 1].points.push(geoPoint)
    routes.value = routes.value
    console.log(routes.value[routes.value.length - 1].points.length)
})
const getPoints = (route: RouteModel) => {
    return route.points.map((point) => [point.latitude, point.longitude])
}

const getFullPoints = () => {
    const x = routes.value.map((x) => x.points)
    console.log(x.flat())
    return  x.flat()
}
const sendNotify = () => {
    workerRepo.notifyWorker(idWorker, notifyMsg.value).then(() => {
        notifyDialog.value = false
        notifyMsg.value = ""
    })
}
const tasks: Ref<TaskModel[]> = ref(await workerRepo.findTasksWhereWorkerId(idWorker))
watch(() => date.value, async () => {
    routes.value = (await routeRepo.getWorkerRoutes(idWorker, date.value.toLocaleString()))
})
onMounted((): void => {
    setTimeout(() => {
        mapReady.value = true
    }, 350)
})
</script>

<style scoped>
.map {
    width: 100%;
    height: calc(100vh * 0.80);
}

.notify-dialog {
    width: 400px;
}
</style>