<template>
    <div>
        <h2>Задачи</h2>
        <TaskFilter/>
        <v-btn class="margin-top" color="blue">Новая задача</v-btn>
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
    </div>
</template>

<script setup lang="ts">
import {useNuxtApp} from "#app";
import {Ref} from "vue";
import TaskItem from "~/components/panel/manager/TaskItem.vue";
import {TaskModel} from "~/models/TaskModel";
import TaskStatistic from "~/components/panel/TaskStatistic.vue";
import TaskFilter from "~/components/panel/manager/TaskFilter.vue";
definePageMeta({
    layout: 'default',
});

const taskRepo = useNuxtApp().$taskRepo
const tasks: Ref<TaskModel[]> = ref([])
const loadTasks = () => {
    taskRepo.getAll().then((res) => {
        tasks.value = res
    })
}
const handledTasks = computed(() => {
    return tasks.value.filter(x => x.state === TaskState.Handled)
})
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