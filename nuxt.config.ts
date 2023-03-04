// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/styles', '~/assets/main.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],

    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

})