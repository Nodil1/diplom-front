<template>

    <div class="modal-container d-flex flex-column">


        <p v-if="props.driver" class="big-text">Редактирование сотрудника</p>
        <p v-if="!props.driver" class="big-text">Создание сотрудника</p>

        <v-checkbox v-model="isOnCar" label="На автомобиле"></v-checkbox>

        <v-text-field label="Марка авто" v-model="carBrand" v-if="isOnCar"/>
        <v-text-field label="Модель авто" v-model="carModel" v-if="isOnCar"/>
        <v-text-field label="Гос. номер" v-model="carNumber" v-if="isOnCar"/>
        <v-text-field label="Расход" v-model="fuelRate" v-if="isOnCar"/>

        <div>
            <v-btn-toggle
                v-model="selectedType"
                rounded="0"
                color="blue"
                multiple
            >
                <v-btn v-for="i in workerTypes">
                    {{ i }}
                </v-btn>


            </v-btn-toggle>
        </div>
        <v-text-field label="Логин" v-model="login" class="margin-top"/>
        <v-text-field class="margin-top" label="ФИО" v-model="fio"/>
        <v-text-field label="Номер телефона" v-model="phone"/>
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

interface IProps {
    driver?: WorkerModel
}

const props = defineProps<IProps>()
const emit = defineEmits(['close'])
const driverLocal = Object.assign({}, props.driver)
const driverRepo = useNuxtApp().$driverRepo


const workerTypes = ["Замерщик", "Курьер", "Сборщик"]
const selectedType = ref(props.driver ? props.driver.type : [0])

const fio = ref(driverLocal?.userModel ? driverLocal.userModel.fio : "")
const login = ref(driverLocal?.userModel ? driverLocal.userModel.login : "")
const phone = ref(driverLocal?.phoneNumber ? driverLocal?.phoneNumber : "")

const carBrand = ref(driverLocal.carModel ? driverLocal.carModel.carBrand : "")
const carModel = ref(driverLocal.carModel ? driverLocal.carModel.carModel : "")
const carNumber = ref(driverLocal.carModel ? driverLocal.carModel.carNumber : "")
const fuelRate = ref(driverLocal.carModel ? driverLocal.carModel.fuelRate : 8.0)

const password = ref("")

const isOnCar = ref(driverLocal.carModel !== null)

const close = () => {
    emit('close')
}

const onSave = () => {
    if (props.driver) {
        update()
    } else {
        save()
    }
}
const update = () => {
    const model = getModel()
    driverRepo.update(model).then(() => {
        useNuxtApp().$toast.success("Данные обновлены")
        emit('close')
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
    })
}
const getModel = () => {
    const model: WorkerModel = {
        phoneNumber: phone.value,
        userModel: {
            login: login.value,
            password: password.value,
            type: 1,
            fio: fio.value,
            id: props.driver?.userModel?.id
        },
        type: selectedType.value
    }
    if (isOnCar) {
        model.carModel = {
            carNumber: carNumber.value,
            carBrand: carBrand.value,
            carModel: carModel.value,
            fuelRate: fuelRate.value
        }
    }
    model.id = model.userModel?.id
    return model
}
const save = () => {

    const model = getModel()

    driverRepo.create(
        model
    ).then(() => {
        emit('close')
        useNuxtApp().$toast.success("Водитель добавлен")
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
    })
}

const deleteWorker = () => {
    driverRepo.delete(props.driver!!).then(() => {
        useNuxtApp().$toast.success("Водитель удален")
        useNuxtApp().$emitter.emit(UpdateDriverEvent.eventName)
    })
}
</script>

<style scoped>
.modal-container {
    width: 400px;
}
</style>