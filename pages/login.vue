<template>
    <div class="container d-flex justify-center align-center">
        <div class="login-form main-container d-flex flex-column">
            <p class="text-center text-h5 ">Вход</p>
            <v-text-field
                class="margin-top"
                label="Логин"
            />
            <v-text-field
                type="password"
                label="Пароль"
            />
            <v-btn color="blue">Войти</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
    height: 100vh;
}
.login-form{
    width: 400px;
}
</style>