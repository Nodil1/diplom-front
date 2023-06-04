<template>
    <div class="page-margin">
        <p class="title-text full-margin">Работники</p>
        <v-row class="margin-top">
            <v-col class="main-container full-margin">
                <p class="big-text">Выездные сотрудники</p>
                <v-text-field label="Поиск водителя" placeholder="Имя или гос.номер"
                              v-model="searchString"></v-text-field>
                <v-dialog
                    v-model="isCreateOpen"
                    width="auto"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="blue">Добавить выездного сотрудника</v-btn>
                    </template>
                    <DriverUserModal @close="isCreateOpen = false">

                    </DriverUserModal>
                </v-dialog>
                <v-row>
                    <v-col><p>ID</p></v-col>
                    <v-col><p>ФИО</p></v-col>
                    <v-col><p>Тип</p></v-col>
                    <v-col><p></p></v-col>
                </v-row>
                <div class="scroll-container custom-scroll">
                    <DriverUserItem class="margin-top" v-for="driver in driverFiltred" :driver="driver"
                                    :key="Math.random()"/>
                </div>
            </v-col>
            <v-col class="main-container full-margin">
                <p class="big-text">Менеджеры</p>
                <v-text-field label="Поиск менеджера" v-model="managerSearch"></v-text-field>
                <v-dialog
                    v-model="isCreateManagerOpen"
                    width="auto"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="blue">Добавить менеджера</v-btn>
                    </template>
                    <ManagerUserModal @close="isCreateManagerOpen = false"/>

                </v-dialog>

                <v-row>
                    <v-col><p>ID</p></v-col>
                    <v-col><p>ФИО</p></v-col>
                    <v-col><p></p></v-col>
                </v-row>
                <div class="scroll-container custom-scroll">
                    <ManagerUserItem class="margin-top" v-for="manager in managerFiltred" :user="manager"
                                     :key="Math.random()"/>
                </div>
            </v-col>
        </v-row>
    </div>


</template>

<script lang="ts" setup>
import PanelLayout from "~/layouts/PanelLayout.vue";
import DriverUserItem from "~/components/panel/admin/DriverUserItem.vue";
import {Ref} from "vue";
import DriverUserModal from "~/components/panel/admin/DriverUserModal.vue";
import {UpdateDriverEvent} from "~/events/UpdateDriverEvent";
import {WorkerModel} from "~/models/WorkerModel";
import ManagerUserModal from "~/components/panel/admin/ManagerUserModal.vue";
import {UserModel} from "~/models/UserModel";
import ManagerUserItem from "~/components/panel/admin/ManagerUserItem.vue";

definePageMeta({
    layout: 'default',
});
const driverRepo = useNuxtApp().$driverRepo
const drivers: Ref<WorkerModel[]> = ref([])
const searchString = ref("")
const isCreateOpen = ref(false)
const isCreateManagerOpen = ref(false)
const managers: Ref<UserModel[]> = ref(await useNuxtApp().$managerRepo.getAll())
const managerSearch = ref("")
const loadDrivers = () => {
    driverRepo.getAll().then((res) => {
        drivers.value = []
        drivers.value = res
        console.log(drivers.value)
    })
}

const driverFiltred = computed(() => {
    console.log("Filter")
    if (searchString.value !== "") {
        return drivers.value.filter((x) => x.userModel!.fio.includes(searchString.value))
    }
    return drivers.value
})

const managerFiltred = computed(() => {
    return managers.value.filter((x) => {
        console.log(x)
        console.log(managerSearch.value)
        return x.fio.toLowerCase().includes(managerSearch.value.toLowerCase()) || managerSearch.value.length === 0
    })
})
onMounted(() => {
    loadDrivers()
    useNuxtApp().$emitter.on(UpdateDriverEvent.eventName, () => {
        loadDrivers()
    })
})
</script>

<style scoped>
:deep(.v-row) {
    margin: auto;
}
</style>