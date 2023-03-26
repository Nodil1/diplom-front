<template>
    <PanelLayout>
        <h2>Работники</h2>
        <v-row>
            <v-col cols="12" md="4" v-for="i in workers">
                <ManagerWorkerItem :worker-model="i" :tasks="tasks"/>

            </v-col>
        </v-row>

    </PanelLayout>
</template>

<script setup lang="ts">
import PanelLayout from "~/layouts/PanelLayout.vue";
import ManagerWorkerItem from "~/components/panel/manager/ManagerWorkerItem.vue";
import {Ref} from "vue";
import {WorkerModel} from "~/models/WorkerModel";
import {TaskModel} from "~/models/TaskModel";

const workerRepo = useNuxtApp().$driverRepo
const taskRepo = useNuxtApp().$taskRepo

const workers: Ref<WorkerModel[]> = ref(await workerRepo.getAll())
const tasks: Ref<TaskModel[]> = ref(await taskRepo.getAll())

</script>

<style scoped>

</style>