<template>
    <div class="main-container">
        <h4>Вложения к задаче</h4>
        <div class="d-flex img-container">
            <img v-for="task in tasks" :src="STORAGE_URL + task.path" alt=""
                 @click="openImg(STORAGE_URL + task.path)">
        </div>
    </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {TaskAttachmentModel} from "~/models/TaskAttachementModel";
import {STORAGE_URL} from "~/data/consts";

const props = defineProps<{
    taskId: number
}>()
const taskRepository = useNuxtApp().$taskRepo
const tasks: Ref<TaskAttachmentModel[]> = ref(await taskRepository.getAttachments(props.taskId))
const openImg = (path: string) => {
    window.open(path, "_blank")
}
</script>

<style scoped>
.img-container {
    overflow-x: scroll;
}

.img-container img {
    height: 300px;
    max-width: 300px;
    background-color: white;
    margin: 10px;
    cursor: pointer;
}
.main-container{
    margin-top: 10px;
}
</style>