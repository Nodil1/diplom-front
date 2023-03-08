<template>
    <PanelLayout>
        <h2>Задачи</h2>
        <div class="d-flex justify-space-between">
            <div class="d-flex flex-column tasks">
                <v-row>
                    <v-col cols="12" md="6" v-for="i in tasks" :key="i" >
                        <TaskItem  :task-model="i"/>
                    </v-col>
                </v-row>
            </div>
            <TaskStatistic :all-tasks="tasks" class="stats margin-top"/>
        </div>
    </PanelLayout>
</template>

<script setup lang="ts">
import PanelLayout from "~/layouts/PanelLayout.vue";
import {useNuxtApp} from "#app";
import {Ref} from "vue";
import TaskItem from "~/components/panel/manager/TaskItem.vue";
import {TaskModel} from "~/models/TaskModel";
import TaskStatistic from "~/components/panel/TaskStatistic.vue";

const taskRepo = useNuxtApp().$taskRepo
const tasks: Ref<TaskModel[]> = ref([])
const loadTasks = () => {
    taskRepo.getAll().then((res) => {
        tasks.value = res
    })
}

onMounted(() => {
    loadTasks()
})
</script>

<style scoped>
.tasks{
    width: 65%;

}
.stats {
    width: 30%;
}
</style>