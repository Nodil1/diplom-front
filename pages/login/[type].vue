<template>
    <div class="container">
        <div class="main-container">
            <p>Вход</p>
            <v-text-field v-model="login" label="Логин" class="margin-top"></v-text-field>
            <v-text-field v-model="password" label="Пароль"></v-text-field>
            <v-btn color="blue" @click="makeLogin">Войти</v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
const login = ref('')
const password = ref('')
const authRepo = useNuxtApp().$authRepo

const makeLogin = () => {
    authRepo.login(login.value, password.value).then(() => {
        if (useRoute().params.type === "manager"){
            useRouter().push('/panel/manager/task')
        } else {
            useRouter().push('/panel/admin')
        }
        useNuxtApp().$toast.success("Вы успешно вошли")
        useCookie("role").value = useRoute().params.type as string
    }).catch(() => {
        useNuxtApp().$toast.error("Неправильный логин или пароль")
    })
}

onBeforeMount(() => {
 if (useCookie("token").value !== undefined){
     if (useRoute().params.type === "manager"){
         useRouter().push('/panel/manager/task')
     } else {
         useRouter().push('/panel/admin')
     } }
})
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
.main-container{
    width: 30%;

}
</style>