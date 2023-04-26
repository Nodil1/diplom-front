<template>
    <div v-if="isLoaded">
        <h2>Анализ данных</h2>
        <v-row>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Распределение задач</h3>
                    <BarChart
                        label="Распределение задач"
                        :labels="labels"
                        :data="data"
                    />
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Статистика задач</h3>

                    <AreaChart
                        label="Статистика задач"
                        :labels="['21.03', '22.03','23.03','24.03','25.03','26.03','27.03']"
                        :data="[1,5,10,3,11,3,4,5]"
                    />
                </div>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Выполнено задач</h3>
                    <BarChart
                        label="Выполнено задач"
                        :labels="labels"
                        :data="[22, 14]"
                    />
                </div>
            </v-col>


        </v-row>

    </div>

</template>

<script setup lang="ts">

import AreaChart from "~/components/charts/AreaChart.vue";
import BarChart from "~/components/charts/BarChart.vue";

definePageMeta({
    layout: 'default',
});

const isLoaded = ref(false)
const workerRepo = useNuxtApp().$driverRepo
const taskRepo = useNuxtApp().$taskRepo
const workers = ref(await workerRepo.getAll())
const a = await Promise.all(workers.value.map(async (x) => {
    const tasks = await taskRepo.findTasksWhereWorkerId(x.id)
    return tasks.length
}))
const data = ref(a)
console.log(data.value)

const labels = ref(workers.value.map((x) => {
    return x.userModel!.fio
}))
onMounted(()=> {
    setTimeout(() => {
        isLoaded.value = true
    }, 500)
})
</script>

<style scoped>
.chart{
}
h2{
    margin-bottom: 20px;
}
</style>