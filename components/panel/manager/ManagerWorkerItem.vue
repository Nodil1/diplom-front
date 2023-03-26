<template>
<div class="d-flex flex-column main-container margin-top main-gap">
    <p>{{props.workerModel.userModel.fio}}</p>
    <v-row>
        <v-col class="d-flex main-gap light-text">
            <v-icon color="blue" icon="mdi-phone"></v-icon>
            <p>{{props.workerModel.phoneNumber}}</p>
        </v-col>
        <v-col class="d-flex main-gap light-text">
            <v-icon color="blue" icon="mdi-format-list-bulleted-type"></v-icon>
            <p v-for="i in props.workerModel.type">{{workerTypeToString(i)}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex main-gap light-text">
            <v-icon color="blue" icon="mdi-calendar-check-outline"></v-icon>
            <p>Задач в очереди: {{tasks.length}}</p>
        </v-col>
        <v-col class="d-flex main-gap light-text">
            <v-icon color="green" icon="mdi-briefcase-outline" v-if="props.workerModel.userModel.isOnline"></v-icon>
            <v-icon color="yellow" icon="mdi-briefcase-outline" v-if="!props.workerModel.userModel.isOnline"></v-icon>

            <p v-if="props.workerModel.userModel.isOnline">На смене</p>
            <p v-if="!props.workerModel.userModel.isOnline">Не работает</p>

        </v-col>
    </v-row>
    <NuxtLink :to="'/panel/manager/worker/' + props.workerModel.userModel.id">
        <v-btn color="blue">Перейти к работнику</v-btn>
    </NuxtLink>
</div>
</template>

<script setup lang="ts">
import {WorkerModel} from "~/models/WorkerModel";
import {TaskModel} from "~/models/TaskModel";
import {Ref} from "vue";

interface IProps {
    workerModel: WorkerModel,
    tasks: TaskModel[],
}
const props = defineProps<IProps>()
const taskRepo = useNuxtApp().$taskRepo
const tasks: Ref<TaskModel[]> = ref([])

onMounted(() => {
    taskRepo.whereWorkerId(props.workerModel.userModel!.id!).then((models) => {
        tasks.value = models
    })
})
</script>

<style scoped>
:deep(.v-row){
    margin: 0;
}
:deep(.v-col){
    padding: 0;
}
</style>