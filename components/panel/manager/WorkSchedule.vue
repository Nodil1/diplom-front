<template>
    <div class="main-container">
        <h4>График работы</h4>
        <div class="d-flex" v-for="(day, idx) in days">
            <v-checkbox v-model="workingDays[idx].working"></v-checkbox>
            <v-text-field :label="`${day} от`" type="time" class="margin-right"
                          v-model="workingDays[idx].start"></v-text-field>
            <v-text-field :label="`${day} до`" type="time" v-model="workingDays[idx].end"></v-text-field>
        </div>
        <v-btn color="blue" class="margin-top" @click="onSave">Сохранить</v-btn>
    </div>
</template>

<script lang="ts" setup>
import {Ref} from "vue";
import {WorkerScheduleModel} from "~/models/WorkerScheduleModel";
const emit = defineEmits(["close"])
const props = defineProps<{
    idWorker: number
}>()
const days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс"
]
const workerRepo = useNuxtApp().$driverRepo
const workingDays = ref([
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
    {working: false, start: "", end: ""},
]);
const schedules: Ref<WorkerScheduleModel[]> = ref(await workerRepo.getSchedule(props.idWorker))
console.log(schedules)
if (schedules.value.length !== 0){
    let idx = 0
    schedules.value.forEach((x) => {
        workingDays.value[idx].working = x.isActive === 1
        workingDays.value[idx].start = x.from
        workingDays.value[idx].end = x.to
        idx++
    })
}

const onSave = () => {
    let idx = 0
    workingDays.value.forEach((x) => {
        workerRepo.saveSchedule({
            idWorker: props.idWorker,
            day: idx,
            isActive: x.working ? 1 : 0,
            from: x.start,
            to: x.end
        })
        idx++
    })
    emit("close")
}
</script>

<style scoped>

</style>