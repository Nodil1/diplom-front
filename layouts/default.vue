<template>
    <v-layout>
        <v-navigation-drawer
            expand-on-hover
            rail
            permanent
            v-if="drawerIsShow"
        >
            <v-list>
                <v-list-item
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    title="Анастасия"
                    subtitle="Директор"
                ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item v-for="i in getTab()" :prepend-icon="i.icon" :value="i.name" @click="onTabClick(i.link)">
                    <v-list-item-title><p class="medium-text">{{ i.name }}</p></v-list-item-title>
                </v-list-item>
                <v-list-item  prepend-icon="mdi-logout" value="Выход" @click="logout">
                    <v-list-item-title><p class="medium-text">Выход</p></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="main">
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import {Ref} from "vue";

interface Tab {
    name: string,
    link: string,
    icon: string
}

const isManager = computed(() => {
    return useRoute().name!.toString().includes('panel-manager')
})
const drawerIsShow = ref(false)

drawerIsShow.value = !useRouter().currentRoute.value.fullPath.includes("login") && useRouter().currentRoute.value.fullPath !== "/"
watch(() => useRouter().currentRoute.value, () => {
    drawerIsShow.value = !useRouter().currentRoute.value.fullPath.includes("login") && useRouter().currentRoute.value.fullPath !== "/";
})

const managerTabs: Ref<Tab[]> = ref([
    {
        name: "Задачи",
        link: "/panel/manager/task",
        icon: "mdi-briefcase"
    },
    {
        name: "Работники",
        link: "/panel/manager/worker",
        icon: "mdi-account-hard-hat"
    },
    {
        name: "Анализ",
        link: "/panel/manager/analysis",
        icon: "mdi-chart-areaspline"
    },
    {
        name: "Карта",
        link: "/panel/manager/map",
        icon: "mdi-cellphone-marker"
    },
])
const adminTabs: Ref<Tab[]> = ref([
    {
        name: "Сотрудники",
        link: "/panel/admin",
        icon: "mdi-account-multiple"
    },
    {
        name: "Настройки системы",
        link: "/panel/admin/settings",
        icon: "mdi-cog"
    },
])
const getTab = (): Tab[] => {
    if (useCookie("role").value === "manager") {
        return managerTabs.value
    }
    return adminTabs.value
}

const onTabClick = (href: string) => {
    useRouter().push(href)
}
const logout = () => {
    useCookie("token").value = undefined
    useCookie("role").value = undefined
    useRouter().push("/")
}
</script>

<style scoped>
.main {
    width: calc(100vw - 50px);
}
</style>