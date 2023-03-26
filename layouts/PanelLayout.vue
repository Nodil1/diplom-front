<template>
    <v-layout>
        <v-navigation-drawer
            expand-on-hover
            rail
            permanent
        >
            <v-list>
                <v-list-item
                    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    title="Вася"
                    subtitle="Директор"
                ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item v-for="i in getTab()" :prepend-icon="i.icon" :value="i.name" @click="onTabClick(i.link)">
                    <v-list-item-title ><p class="medium-text">{{i.name}}</p></v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-main class="main">
            <slot ></slot>
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


const managerTabs: Ref<Tab[]>= ref([
    {
        name: "Задачи",
        link: "/panel/manager/task",
        icon: "mdi-account-hard-hat"
    },
    {
        name: "Работники",
        link: "/panel/manager/worker",
        icon: "mdi-account-hard-hat"
    }
])

const getTab = () : Tab[] => {
    if (isManager.value){
        return managerTabs.value
    }
    return managerTabs.value
}

const onTabClick = (href: string) => {
    useRouter().push(href)
}
</script>

<style scoped>
.main {
    margin: 20px;
}
</style>