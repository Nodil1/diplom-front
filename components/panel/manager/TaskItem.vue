<template>
    <div class="main-container margin-top">
        <div class=" status-color"
             :class="{
            'yellow-bg': props.taskModel.state === TaskState.WAITING,
            'blue-bg': props.taskModel.state === TaskState.IN_WORK,
        }"></div>
        <div class="d-flex flex-column content main-gap">
            <div class="d-flex align-center">
                <p class="margin-right">№: {{ props.taskModel.id }}</p>
                <p>{{ props.taskModel.name }}</p>
            </div>
            <p class="light-text">{{ props.taskModel.description }}</p>
           <v-row>
               <v-col class="d-flex main-gap light-text">
                   <v-icon color="blue" icon="mdi-city"></v-icon>
                   <p>{{props.taskModel.address}}</p>
               </v-col>
               <v-col class="d-flex main-gap light-text">
                   <v-icon color="blue" icon="mdi-account-tie"></v-icon>
                   <p>{{props.taskModel.customer}}</p>
               </v-col>
           </v-row>
            <v-row>
                <v-col class="d-flex main-gap light-text">
                    <v-icon color="blue" icon="mdi-state-machine"></v-icon>
                    <p>{{taskStateToString(props.taskModel.state)}}</p>
                </v-col>
                <v-col class="d-flex main-gap light-text">
                    <v-icon color="blue" icon="mdi-timer-alert-outline"></v-icon>
                    <p>{{props.taskModel.expireAt.toLocaleString()}}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex main-gap light-text">
                    <v-icon color="blue" icon="mdi-account-hard-hat"></v-icon>
                    <p v-if="props.taskModel.worker">
                        {{props.taskModel.worker.userModel.fio}}&nbsp;
                        {{props.taskModel.worker.phoneNumber}}
                    </p>
                    <p v-if="!props.taskModel.worker">Исполнитель не назначен</p>
                </v-col>
            </v-row>
            <NuxtLink :to="'/panel/manager/task/' + props.taskModel.id"><v-btn color="blue">Перейти к задаче</v-btn></NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet/dist/vue-leaflet.es";
import {TaskModel} from "~/models/TaskModel";
import {TaskState} from "~/models/enum/TaskState";

interface IProps {
    taskModel: TaskModel
}

const props = defineProps<IProps>()
const zoom = ref(3)
</script>

<style scoped>
.yellow-bg{
}
.status-color{
    height: 4px;
}

.main-container {
    overflow: hidden;
    padding: 0;
}
.content {
    padding: 15px;
}
:deep(.v-row){
    margin: 0;
}
:deep(.v-col){
    padding: 0;
}
</style>