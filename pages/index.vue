<template>

</template>

<script lang="ts" setup>
import {useAsyncData} from "#app";

const {data: a} = await useAsyncData(
    'mountains',
    () => useNuxtApp().$driverRepo.getAll())
console.log(a.value)
</script>

<style scoped>

</style>