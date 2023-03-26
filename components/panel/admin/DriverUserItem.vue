<template>
    <div>
        <v-row class="secondary-container">
            <v-col class="d-flex align-center">
                <p>{{ props.driver.userModel.id }}</p>
            </v-col>
            <v-col class="d-flex align-center">
                <p>{{ props.driver.userModel.fio }}</p>
            </v-col>
            <v-col class="d-flex align-center">
                <p>{{ props.driver.userModel.createdAt }}</p>
            </v-col>
            <v-col>
                <v-dialog
                    v-model="idDialogOpen"
                    width="auto"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn  v-bind="props" color="blue">Управление</v-btn>
                    </template>
                    <DriverUserModal @close="onClose" :driver="props.driver">

                    </DriverUserModal>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import DriverUserModal from "~/components/panel/admin/DriverUserModal.vue";
interface IProps{
    driver: WorkerModel
}
const props = defineProps<IProps>()


const idDialogOpen  = ref(false)
const onClose = () => {
    idDialogOpen.value = false
}
onMounted(()=>{
    console.log("Render DriverItem")
    console.log(props.driver)
})
</script>
<style scoped>
.secondary-container {
    padding: 5px;
}
</style>