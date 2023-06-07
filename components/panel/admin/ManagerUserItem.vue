<template>
    <v-row class="secondary-container">
        <v-col class="d-flex align-center">
            <p>{{ props.user.id }}</p>
        </v-col>
        <v-col class="d-flex align-center">
            <p>{{ props.user.fio }}</p>
        </v-col>
        <v-col>
            <v-dialog
                v-model="isDialogOpen"
                width="auto"
            >
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="blue">Управление</v-btn>
                </template>
                <ManagerUserModal :user="props.user" @close="isDialogOpen = false">

                </ManagerUserModal>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import {UserModel} from "~/models/UserModel";
import ManagerUserModal from "~/components/panel/admin/ManagerUserModal.vue";

const props = defineProps<{
    user: UserModel
}>()
const isDialogOpen = ref(false)
</script>

<style scoped>

</style>