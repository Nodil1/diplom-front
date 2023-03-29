<template>
    <div>
        <h2>Задания работника</h2>
        <v-row>
            <v-col cols="12" md="6">
                <TaskItem v-for="task in tasks" :task-model="task" :key="task.id"/>
            </v-col>
            <v-col>
                <div class="map main-container margin-top" v-if="mapReady">
                    <l-map ref="map" v-model:zoom="zoom" :center="[33.33, 67.89]" :use-global-leaflet="false">
                        <l-tile-layer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            layer-type="base"
                            name="OpenStreetMap"
                        ></l-tile-layer>
                        <l-marker :draggable="true" :lat-lng="[33.33, 67.89]">
                            <LPopup>
                                <p>{{ worker.userModel.fio }}</p>
                            </LPopup>
                            <LIcon
                                :icon-size="[25, 41]"
                                :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"></LIcon>
                        </l-marker>
                    </l-map>
                </div>

            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import TaskItem from "~/components/panel/manager/TaskItem.vue";
import {Ref} from "vue";
import {TaskModel} from "~/models/TaskModel";
import {LMarker, LMap, LTileLayer, LIcon, LPopup} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import {useNuxtApp} from "#app";
import {WorkerModel} from "~/models/WorkerModel";

definePageMeta({
    layout: 'default',
});

const idWorker = parseInt(useRoute().params.id as string)
const worker: Ref<WorkerModel> = ref(await useNuxtApp().$driverRepo.getById(idWorker))
const taskRepo = useNuxtApp().$taskRepo

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