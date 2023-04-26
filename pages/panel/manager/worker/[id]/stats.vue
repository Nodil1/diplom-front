<template>
    <div v-if="isLoaded">
        <h2>Анализ данных работника {{worker.userModel.fio}}</h2>
        <v-row>
            <v-col cols="12" md="6">
                <div class="chart main-container">
                    <h3>Пробег</h3>
                    <AreaChart
                        label="Пробег, км"
                        :labels="['21.03', '22.03','23.03','24.03','25.03','26.03','27.03']"
                        :data="[24,30,15,22,15,16,13,5]"
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

    </div>
</template>

<script setup lang="ts">
import AreaChart from "~/components/charts/AreaChart.vue";
import {Ref} from "vue";
import {WorkerModel} from "~/models/WorkerModel";
import {useNuxtApp} from "#app";

const idWorker = parseInt(useRoute().params.id as string)
const worker: Ref<WorkerModel> = ref(await useNuxtApp().$driverRepo.getById(idWorker))
const isLoaded = ref(false)

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