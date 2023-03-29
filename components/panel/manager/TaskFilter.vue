<template>
<div class="d-flex main-gap flex-wrap">
    <v-btn-toggle
        class="margin-top"
        v-model="selectedType"
        rounded="30"
        color="blue"
        multiple
    >
        <v-btn v-for="i in taskTypes">
            {{ i }}
        </v-btn>

    </v-btn-toggle>
    <v-btn-toggle
        class="margin-top"
        v-model="selectedState"
        rounded="30"
        color="blue"
        multiple
    >
        <v-btn v-for="i in states">
            {{ i }}
        </v-btn>

    </v-btn-toggle>
    <div class="flex-break">
    </div>
    <div class="search">
        <v-text-field
            label="Поиск"
            v-model="search"
            hide-details
            placeholder="Название задачи или имя клиента"
        />
    </div>
</div>
</template>

<script setup lang="ts">
import {states, taskTypes} from "~/data/consts";

const selectedType = ref([0,1,2])
const selectedState = ref([0,1])
const search = ref('')
</script>

<style scoped>
.search{
    width: 660px;
}
</style>