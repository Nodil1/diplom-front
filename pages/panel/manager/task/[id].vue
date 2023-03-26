<template>
    <PanelLayout>


        <div class="d-flex main-gap">
            <div class="info main-container scroll-container custom-scroll">
                <h4 class="light-text">№ {{task.id}}</h4>
                <v-btn-toggle
                    class="margin-top"
                    v-model="selectedType"
                    rounded="0"
                    color="blue"
                    multiple
                >
                    <v-btn v-for="i in taskTypes">
                        {{ i }}
                    </v-btn>


                </v-btn-toggle>
                <v-text-field
                    class="margin-top"
                    label="Название"
                    density="comfortable"
                    v-model="task.name"
                />
                <v-text-field
                    label="Описание"
                    density="comfortable"
                    v-model="task.description"
                />
                <v-text-field
                    label="Адрес"
                    density="comfortable"
                    v-model="task.address"
                />
                <v-text-field
                    label="Клиент"
                    density="comfortable"
                    v-model="task.customer"
                />
                <v-select
                    label="Статус"
                    v-model="selectedState"
                    :items="states"
                >

                </v-select>
                <v-autocomplete
                    label="Исполнитель"
                    v-model="selectedWorker"
                    :items="allWorkers.map(x => x.userModel.fio)"
                >

                </v-autocomplete>
                <v-expansion-panels>
                    <v-expansion-panel
                        :title="'Время выполнения: ' + task.expireAt.toLocaleString()"
                    >
                        <v-expansion-panel-text>
                            <v-date-picker  class="full-width" v-model="task.expireAt" mode="dateTime" is24hr/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-btn class="margin-top" color="blue" @click="onSave">Сохранить</v-btn>
            </div>
            <div class="map main-container">
                <l-map ref="map" v-model:zoom="zoom" :center="[task.latitude, task.longitude]" :use-global-leaflet="false">
                    <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                    ></l-tile-layer>
                    <l-marker :draggable="true" :lat-lng="[task.latitude, task.longitude]" @dragstart="onDrag" >
                        <LIcon
                            :icon-size="[25, 41]"
                            :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"></LIcon>
                    </l-marker>
                </l-map>
            </div>
        </div>

    </PanelLayout>
</template>

<script setup lang="ts">
import {LMarker, LMap, LTileLayer, LIcon} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import PanelLayout from "~/layouts/PanelLayout.vue";
import {useAsyncData, useNuxtApp} from "#app";
import {TaskModel} from "~/models/TaskModel";
import {Ref} from "vue";
import {states, taskTypes} from "~/data/consts";
import {stringToTaskState} from "~/utils/utils";
import {WorkerModel} from "~/models/WorkerModel";

const zoom = ref(10)
const idTask = useRoute().params.id as string
const taskRepo = useNuxtApp().$taskRepo
const workerRepo = useNuxtApp().$driverRepo
const allWorkers: Ref<WorkerModel[]> = ref(await workerRepo.getAll())
const task: Ref<TaskModel> = ref(await taskRepo.getById(parseInt(idTask)))

const selectedType = ref(task.value.taskType)
const selectedState = ref(taskStateToString(task.value.state))
const selectedWorker = ref(task.value.worker ? task.value.worker.userModel!.fio : "Исполнитель не назначен")

watch(() => selectedState.value , () => {
    task.value.state = stringToTaskState(selectedState.value)
})
watch(() => selectedType.value, () => {
    const vals = Object.values(selectedType.value)
    if (vals.includes(0) && vals.length > 1){
        selectedType.value = vals.filter(x => x !== 0)
    }
})
const onDrag = () => {
    console.log("drag")
}
const onSave = () => {
    let newTask = Object.assign({}, task.value)
    newTask.taskType = Object.values(selectedType.value)
    taskRepo.update(newTask)
}
</script>

<style scoped>
.map {
    width: 60%;
    height: calc(100vh * 0.93);
}
.scroll-container{
    max-height: calc(100vh * 0.93);

}
.info{
    width: 40%;
}
</style>