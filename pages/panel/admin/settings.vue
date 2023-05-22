<template>
<div>
    <h2>Настройки системы</h2>
    <v-btn color="blue" class="margin-top">Сохранить настройки</v-btn>
    <v-row class="margin-top">
        <v-col cols="6">
            <div class="main-container">
                <v-alert type="info"
                         title="API токен приложения"
                         text="Токен, используемый для интеграции с другой системой">
                </v-alert>
                <v-text-field class="margin-top" v-model="token" label="Токен" density="comfortable"/>
                <v-btn @click="generateApiToken" color="blue">Сгенерировать токен</v-btn>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="main-container full-height">
                <v-alert type="info"
                         title="Автоматизация системы"
                         text="Включает автоматическое распределение задач между сотрудниками, если задание приходит из внешней системы.">
                </v-alert>
                <v-checkbox v-model="automationEnable" label="Включить автоматизацию"></v-checkbox>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="main-container">
                <v-alert type="info"
                         title="Расстояние для записи геолокации"
                         text="На сколько метров должен переместиться работник для записи его геолокации">
                </v-alert>
                <v-text-field class="margin-top" v-model="geoDistanceInterval"
                              label="Расстояние, м"
                ></v-text-field>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="main-container">
                <v-alert type="info"
                         title="Интервал записи геолокации"
                         text="Через какой интервал времени сохранять геолокацию сотрудника.">
                </v-alert>
                <v-text-field class="margin-top" v-model="geoTimeInterval"
                              label="Интервал, мс"

                ></v-text-field>
            </div>
        </v-col>
    </v-row>

</div>
</template>

<script setup lang="ts">
import crypto from 'crypto';

const token = ref("")
const automationEnable = ref(false)
const geoTimeInterval = ref(1000)
const geoDistanceInterval = ref(5)
const generateApiToken = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 64; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    token.value = result
}
</script>

<style scoped>

</style>