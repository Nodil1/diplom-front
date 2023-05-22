<template>
    <div v-if="isLoaded">
        <h2>Анализ данных работника {{worker.userModel.fio}}</h2>

        <v-row>
            <v-col cols="12" md="3">
                <v-date-picker class="" v-model="dateRange" is-range/>

            </v-col>
            <v-col cols="12" md="9">
                <div class="chart main-container">
                    <h3>Пробег</h3>
                    <AreaChart
                        :data="[mileageStats ]"
                        :second-axis = [taskStats]
                    />
                </div>
            </v-col>

        </v-row>

    </div>
</template>

<script setup lang="ts">
import AreaChart from "~/components/charts/AreaChart.vue";
import {Ref} from "vue";
import {WorkerModel} from "~/models/WorkerModel";
import {useNuxtApp} from "#app";
import {RouteModel} from "~/models/RouteModel";
import {mileageStatistics, taskDateCount, taskDateCountFinished} from "~/utils/AnalysisUtils";
import {TaskModel} from "~/models/TaskModel";

const idWorker = parseInt(useRoute().params.id as string)
const routeRepository = useNuxtApp().$routeRepo
const taskRepository = useNuxtApp().$taskRepo
const dateRange = ref({
    start: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    end: new Date()
})
const tasks: Ref<TaskModel[]> = ref(await taskRepository.getTaskForPeriod(dateRange.value.start, dateRange.value.end))
const routes: Ref<RouteModel[]> = ref(await routeRepository.getWorkerRoutesBetween(idWorker, dateRange.value.start.toISOString(),  dateRange.value.end.toISOString()))
const worker: Ref<WorkerModel> = ref(await useNuxtApp().$driverRepo.getById(idWorker))
const isLoaded = ref(false)
const mileageStats = computed(() => {
    const stats = mileageStatistics(routes.value, dateRange.value.start, dateRange.value.end)
    return {
        label: "Пробег, км",
        labels: Object.keys(stats),
        data: Object.values(stats),
        borderWidth: 1,
        fill: 'origin'
    }
})
const taskStats = computed(() => {
    const stats = taskDateCountFinished(tasks.value, dateRange.value.start, dateRange.value.end, worker.value.id)
    return {
        label: "Выполнено заданий",
        labels: Object.keys(stats),
        data: Object.values(stats),
        borderWidth: 1,
        fill: 'origin'
    }
})
onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
    }, 500)
})
</script>

<style scoped>
h2{
    margin-bottom: 20px;
}
</style>