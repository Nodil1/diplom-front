<template>
    <div class="main-container d-flex flex-column">
        <h2>Статистика</h2>
        <v-row class="margin-top">
            <v-col>
                <div class="secondary-container d-flex flex-column">
                    <p>Всего заявок</p>
                    <p>{{ props.allTasks.length}}</p>
                </div>
            </v-col>
            <v-col>
                <div class="secondary-container d-flex flex-column">
                    <p>В ожидании</p>
                    <p>{{waiting}}</p>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="secondary-container d-flex flex-column">
                    <p>Нет исполнителя</p>
                    <p>{{ moWorker }}</p>
                </div>
            </v-col>
            <v-col>
                <div class="secondary-container d-flex flex-column">
                    <p>В работе</p>
                    <p>{{ inWork }}</p>
                </div>
            </v-col>
        </v-row>

    </div>
</template>

<script setup lang="ts">
import {TaskModel} from "~/models/TaskModel";
import {TaskState} from "~/models/enum/TaskState";

interface IProps{
    allTasks: TaskModel[]
}
const props = defineProps<IProps>()
const waiting = computed(() => {
    return props.allTasks.filter(x => x.state === TaskState.WAITING).length
})

const moWorker = computed(() => {
    return props.allTasks.filter(x => !x.worker).length
})

const inWork = computed(() => {
    return props.allTasks.filter(x => x.state === TaskState.IN_WORK).length
})
</script>

<style scoped>
:deep(.v-col){
    height: 100%;
}
.secondary-container {
    height: 100%;
}
</style>