<template>
    <div>
        <h2>Задачи</h2>
        <NuxtLink to="/panel/manager/task/new" >
            <v-btn class="margin-top" color="blue">Новая задача</v-btn>
        </NuxtLink>
        <TaskFilter @filterChange="filter"/>
        <div class="d-flex justify-space-between">
            <v-row>
                <v-col cols="12" md="8">
                    <div class="d-flex flex-column tasks">
                        <v-row>
                            <v-col cols="12" md="6" v-for="i in filtredTask" :key="i">
                                <TaskItem :task-model="i"/>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" md="4">
                    <TaskStatistic :all-tasks="filtredTask" class="stats margin-top"/>
                </v-col>
            </v-row>


        </div>
    </div>
</template>

<script setup lang="ts">
import {useAsyncData, useNuxtApp} from "#app";
import {Ref} from "vue";
import TaskItem from "~/components/panel/manager/TaskItem.vue";
import {TaskModel} from "~/models/TaskModel";
import TaskStatistic from "~/components/panel/TaskStatistic.vue";
import TaskFilter from "~/components/panel/manager/TaskFilter.vue";
import {TaskFilterModel} from "~/models/TaskFilterModel";

definePageMeta({
    layout: 'default',
});

const taskRepo = useNuxtApp().$taskRepo
const {data: tasks} = await useAsyncData(
    'allWorkers',
    () => taskRepo.getAll()
)

const filtredTask: Ref<TaskModel[]> = ref(tasks.value!)

const filter = (filter: TaskFilterModel) => {
    filtredTask.value = tasks.value!.filter((x: TaskModel) => {
        return filter.states.includes(x.state)
    }).filter((x: TaskModel) => {
        return filter.types.includes(x.taskType[0])
    }).filter((x: TaskModel) => {
        console.log(x.name.toLowerCase())
        return x.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            x.description.toLowerCase().includes(filter.search.toLowerCase()) ||
            x.customer.toLowerCase().includes(filter.search.toLowerCase())
    })

}
onMounted(() => {
})
</script>

<style scoped>
.tasks {

}

.stats {
    height: 260px;
}
</style>