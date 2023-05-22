<template>
    <div v-if="isLoaded">
        <h2>Анализ данных</h2>
        <v-row class="margin-top">
            <v-col cols="12" md="3">
                <v-date-picker class="full-height full-width" v-model="dateRange" is-range/>
            </v-col>
            <v-col cols="12" md="9">
                <div class="chart main-container">
                    <h3>Статистика задач</h3>
                    <AreaChart
                        v-if="showChart"
                        :data="[taskDateCountStats, taskDateCountStatsFinished, taskDateStatsFinishedOnTime, taskDateStatsFinishedNotOnTime]"
                    />
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Активные задания</h3>
                    <BarChart
                        v-if="showChart"
                        :data="[workerTask]"
                    />
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Выполнено задач</h3>
                    <BarChart
                        v-if="showChart"
                        :data="[workerFinishedTask]"
                    />
                </div>
            </v-col>
        </v-row>


    </div>

</template>

<script setup lang="ts">

import AreaChart from "~/components/charts/AreaChart.vue";
import BarChart from "~/components/charts/BarChart.vue";
import {Ref} from "vue";
import {TaskModel} from "~/models/TaskModel";
import {
    taskCompletedStats,
    taskDateCount,
    taskDateCountFinished,
    taskDateCountFinishedNotOnTime,
    taskDateCountFinishedOnTime
} from "~/utils/AnalysisUtils";

definePageMeta({
    layout: 'default',
});
const dateRange = ref({
    start: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    end: new Date()
})
console.log(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000))
const isLoaded = ref(false)
const showChart = ref(true)
const workerRepo = useNuxtApp().$driverRepo
const taskRepo = useNuxtApp().$taskRepo
const workers = ref(await workerRepo.getAll())
const tasks: Ref<TaskModel[]> = ref(await taskRepo.getTaskForPeriod(dateRange.value.start, dateRange.value.end))
watch(() => dateRange.value , async () => {

    tasks.value = await taskRepo.getTaskForPeriod(dateRange.value.start, dateRange.value.end)
    showChart.value = false
    setTimeout(() => {
        showChart.value = true
    }, 200)
})
const taskDateCountStats = computed((): ChartData => {
        const result = taskDateCount(tasks.value, dateRange.value.start, dateRange.value.end)
        return {
            label: "Новые задания",
            labels: Object.keys(result),
            data: Object.values(result),
            borderWidth: 1,
            fill: 'origin'
        }
    }
)
const taskDateCountStatsFinished = computed((): ChartData => {
        const result = taskDateCountFinished(tasks.value, dateRange.value.start, dateRange.value.end)
        return {
            label: "Выполненые задания",
            labels: Object.keys(result),
            data: Object.values(result),
            borderWidth: 1,
            fill: 'origin'
        }
    }
)
const taskDateStatsFinishedOnTime = computed((): ChartData => {
        const result = taskDateCountFinishedOnTime(tasks.value, dateRange.value.start, dateRange.value.end)
        return {
            label: "Выполнено вовремя",
            labels: Object.keys(result),
            data: Object.values(result),
            borderWidth: 1,
            fill: 'origin'
        }
    }
)
const taskDateStatsFinishedNotOnTime = computed((): ChartData => {
        const result = taskDateCountFinishedNotOnTime(tasks.value, dateRange.value.start, dateRange.value.end)
        return {
            label: "Просрочено",
            labels: Object.keys(result),
            data: Object.values(result),
            borderWidth: 1,
            fill: 'origin'
        }
    }
)
const workerTask = computed(() => {
    const result = workerTaskStats(tasks.value)
    return {
        label: "Активные задания",
        labels: Object.keys(result),
        data: Object.values(result),
        borderWidth: 1,
        fill: 'origin'
    }
})
const workerFinishedTask = computed(() => {
    const result = taskCompletedStats(tasks.value)
    return {
        label: "Выполненые задания",
        labels: Object.keys(result),
        data: Object.values(result),
        borderWidth: 1,
        fill: 'origin'
    }
})
const labels = ref(workers.value.map((x) => {
    return x.userModel!.fio
}))
onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
    }, 500)
})
</script>

<style scoped>
.chart {
}

h2 {
    margin-bottom: 20px;
}
</style>