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
                <v-list-item prepend-icon="mdi-account-hard-hat"  value="workers">
                    <v-list-item-title ><p class="medium-text">Работники</p></v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-cog"  value="settings">
                    <v-list-item-title><p class="medium-text">Настройки</p></v-list-item-title>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="main">
            <slot ></slot>
        </v-main>
    </v-layout>
</template>

<script>
export default {
    name: "PanelLayout"
}
</script>

<style scoped>
.main {
    margin: 20px;
}
</style>