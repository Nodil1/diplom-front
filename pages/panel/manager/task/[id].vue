<template>
    <div class="d-flex main-gap">
        <div class="info main-container scroll-container custom-scroll">
            <h4 class="light-text">№ {{ task.id }}</h4>
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
                    :title="'Когда выполнить: ' + task.expireAt.toLocaleString()"
                >
                    <v-expansion-panel-text>
                        <v-date-picker class="full-width" v-model="task.expireAt" mode="dateTime" is24hr/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-btn class="margin-top" color="blue" @click="onSave">Сохранить</v-btn>
        </div>
        <div class="map main-container" v-if="mapReady">
            <ClientOnly>
                <l-map ref="map" v-model:zoom="zoom" :center="[task.latitude, task.longitude]"
                       :use-global-leaflet="false">
                    <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                    ></l-tile-layer>
                    <l-marker :draggable="true" :lat-lng="[task.latitude, task.longitude]" @dragend="onDrag">
                        <LPopup>
                            <p>{{ task.name }}</p>
                        </LPopup>
                        <LIcon
                            :icon-size="[25, 41]"
                            :icon-url="'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'"></LIcon>
                    </l-marker>
                </l-map>
            </ClientOnly>
        </div>
    </div>

</template>

<script setup lang="ts">
import {LIcon, LMap, LMarker, LPopup, LTileLayer} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import {useAsyncData, useNuxtApp} from "#app";
import {TaskModel} from "~/models/TaskModel";
import {Ref} from "vue";
import {states, taskTypes} from "~/data/consts";
import {stringToTaskState} from "~/utils/utils";
import {WorkerModel} from "~/models/WorkerModel";
import {DragEndEvent} from "leaflet";
import {TaskState} from "~/models/enum/TaskState";

definePageMeta({
    layout: 'default',
});
const mapReady = ref(false)
const zoom = ref(10)
const isNew = useRoute().params.id as string === 'new'
const idTask = isNew ? null : parseInt(useRoute().params.id as string)
const taskRepo = useNuxtApp().$taskRepo
console.log("Load")
const workerRepo = useNuxtApp().$driverRepo
const {data: allWorkers} = await useAsyncData(
    'allWorkers',
    () => workerRepo.getAll()
)

console.log(allWorkers.value)
const emptyTask: TaskModel = {
    name: '',
    description: '',
    address: '',
    customer: '',
    taskType: [],
    latitude: 0,
    longitude: 0,
    state: TaskState.WAITING,
    expireAt: new Date(),
}
const task: Ref<TaskModel> = isNew ? ref(emptyTask) : ref(await taskRepo.getById(idTask!))
const selectedType = ref(task.value.taskType)
const selectedState = ref(taskStateToString(task.value.state))
const selectedWorker = ref(task.value.worker ? task.value.worker.userModel!.fio : "Исполнитель не назначен")

watch(() => selectedWorker.value, () => {
    task.value.worker = allWorkers.value!.find((x) => x.userModel!.fio === selectedWorker.value)
})
watch(() => selectedState.value, () => {
    task.value.state = stringToTaskState(selectedState.value)
    console.log(task.value.state)
})
watch(() => selectedType.value, () => {
    const vals = Object.values(selectedType.value)
    if (vals.includes(0) && vals.length > 1) {
        selectedType.value = vals.filter(x => x !== 0)
    }
})
const onDrag = (e: DragEndEvent) => {
    task.value.latitude = e.target._latlng.lat
    task.value.longitude = e.target._latlng.lng
}
const onSave = () => {
    console.log("AAA")
    let newTask = Object.assign({}, task.value)
    console.log(newTask)
    newTask.taskType = Object.values(selectedType.value)
    if (isNew) {
        newTask.taskType = [1, 2]
        taskRepo.create(newTask).then(() => {
            useNuxtApp().$toast.success("Задача создана")
            useNuxtApp().$router.push("/panel/manager/task")
        })
    } else {
        taskRepo.update(newTask).then(() => {
            useNuxtApp().$toast.success("Данные обновлены")
        })
    }

}

onMounted(async () => {
    navigator.geolocation.getCurrentPosition((pos) => {
        task.value.latitude = pos.coords.latitude
        task.value.longitude = pos.coords.longitude
    })
    setTimeout(() => {
        mapReady.value = true
        if (isNew) {
            navigator.geolocation.getCurrentPosition((pos) => {
                task.value.latitude = pos.coords.latitude
                task.value.longitude = pos.coords.longitude
            })
        }
    }, 350)
})
</script>

<style scoped>
.map {
    width: 60%;
    height: calc(100vh * 0.93);
}

.scroll-container {
    max-height: calc(100vh * 0.93);

}

.info {
    width: 40%;
}
</style>