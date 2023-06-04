<template>
    <div class="container">

        <div class="d-flex flex-column align-center main-gap">
            <NuxtLink to="/login/manager" >
                <v-btn color="blue">Вход менеджер</v-btn>
            </NuxtLink>
            <NuxtLink to="/login/admin">
                <v-btn color="blue">Вход администратор</v-btn>
            </NuxtLink>
            <v-btn>Скачать приложение</v-btn>
        </div>

    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.container{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>