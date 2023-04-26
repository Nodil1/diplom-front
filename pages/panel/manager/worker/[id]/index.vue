<template>
    <div>
        <h2>Задания работника</h2>
        <NuxtLink :to="`/panel/manager/worker/${worker.id}/stats`" >
            <v-btn color="blue" class="margin-top">Статистика</v-btn>
        </NuxtLink>
        <v-row>
            <v-col cols="12" md="6">
                <TaskItem v-for="task in tasks" :task-model="task" :key="task.id"/>
            </v-col>
            <v-col>
                <div class="map main-container margin-top" v-if="mapReady">
                    <ClientOnly>
                        <l-map ref="map" v-model:zoom="zoom" :center="[47.234787, -1.358337]" :use-global-leaflet="false">
                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                layer-type="base"
                                name="OpenStreetMap"
                            ></l-tile-layer>
                            <LPolyline
                                :lat-lngs="[[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]]"
                            />
                            <l-marker  :lat-lng="[47.234787, -1.358337]">
                                <LPopup>
                                    <p>{{ worker.userModel.fio }}</p>
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

definePageMeta({
    layout: 'default',
});

const idWorker = parseInt(useRoute().params.id as string)
const worker: Ref<WorkerModel> = ref(await useNuxtApp().$driverRepo.getById(idWorker))
const taskRepo = useNuxtApp().$taskRepo
const routeRepo = useNuxtApp().$routeRepo

const route: Ref<RouteModel> = ref((await routeRepo.getWorkerRoutes(worker.value.id))[0])
const mapReady = ref(false)
const zoom = ref(10)

const tasks: Ref<TaskModel[]> = ref(await taskRepo.findTasksWhereWorkerId(idWorker))
console.log(tasks.value)

onMounted((): void => {
    setTimeout(() => {
        mapReady.value = true
    }, 350)
})
</script>

<style scoped>
.map {
    width: 100%;
    height: calc(100vh * 0.93);
}
</style>