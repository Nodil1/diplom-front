<template>
    <div class="modal-container d-flex flex-column">

        <v-text-field label="Логин" v-model="login"/>
        <v-text-field class="margin-top" label="ФИО" v-model="fio"/>
        <v-text-field label="Пароль" v-model="password"/>
        <v-btn class="margin-top" color="red" @click="deleteWorker">Уволить</v-btn>
        <div class="d-flex justify-space-between margin-top">
            <v-btn @click="close">Отмена</v-btn>
            <v-btn @click="onSave" color="blue">Сохранить</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {def} from "@vue/shared";
import {UpdateDriverEvent} from "~/events/UpdateDriverEvent";
import {useNuxtApp} from "#app";
import {WorkerModel} from "~/models/WorkerModel";
import {UserModel} from "~/models/UserModel";

interface IProps {
    user?: UserModel
}

const props = defineProps<IProps>()
const emit = defineEmits(['close'])
const userLocal = Object.assign({}, props.user)
const managerRepo = useNuxtApp().$managerRepo

const fio = ref(userLocal ? userLocal.fio : "")
const login = ref(userLocal ? userLocal.login : "")

const password = ref("")

const close = () => {
    emit('close')
}

const onSave = () => {
    if (props.user) {
        update()
    } else {
        save()
    }
}
const update = () => {
    const model = getModel()
    managerRepo.update(model).then(() => {
        useNuxtApp().$toast.success("Данные обновлены")
        emit('close')
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
    })
}
const getModel = () => {
    const model: UserModel = {
            login: login.value,
            password: password.value,
            type: 1,
            fio: fio.value,
            id: props.user?.id
    }
    return model
}
const save = () => {
    const model = getModel()
    managerRepo.create(
        model
    ).then(() => {
        emit('close')
        useNuxtApp().$toast.success("Менеджер добавлен")
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
    })
}
const deleteWorker = () => {
    managerRepo.delete(props.user!!).then(() => {
        useNuxtApp().$toast.success("Менеджер удален")
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
        close()
    })
}
</script>

<style scoped>
.modal-container {
    width: 400px;
}
</style>