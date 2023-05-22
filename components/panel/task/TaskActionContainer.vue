<template>
    <div class="main-container">
        <h4>История действий</h4>
        <v-row>
            <v-col>№</v-col>
            <v-col>Работник</v-col>
            <v-col>Действие</v-col>
            <v-col>Время</v-col>
        </v-row>

        <v-row v-for="(action, idx) in actions" class="hover-row">
            <v-col>{{idx + 1}}</v-col>
            <v-col>
                <NuxtLink :to="'/panel/manager/worker/' + action.worker.id">
                    {{ action.worker.userModel.fio}}
                </NuxtLink>

            </v-col>
            <v-col>{{ WorkerActionTypeStrings[action.type] }}</v-col>
            <v-col>{{ action.createdAt }}</v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">

import {TaskModel} from "~/models/TaskModel";
import {WorkerActionModel} from "~/models/WorkerActionModel";
import {Ref} from "vue";
import {WorkerActionTypeStrings} from "~/models/enum/WorkerActionType";

const props = defineProps<{
    task: TaskModel
}>()
const taskRepository = useNuxtApp().$taskRepo
const workerRepo = useNuxtApp().$driverRepo

const actions: Ref<WorkerActionModel[]> = ref(await taskRepository.getActions(props.task.id!!))

const getWorkerName = async (idWorker: number) => {
  return await workerRepo.getById(idWorker)
}
</script>

<style scoped>
.main-container{
    margin-top: 10px;
}
.hover-row:hover{
    background-color: var(--secondary);
    transition-duration: 300ms;

}
.hover-row{
    transition-duration: 300ms;
}
</style>