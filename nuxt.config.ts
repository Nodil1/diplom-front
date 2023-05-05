// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/styles',
        '~/assets/main.css',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css',
        'leaflet/dist/leaflet.css',
        'v-calendar/dist/style.css'
    ],
    build: {
        transpile: ['vuetify'],
    },
    ssr: false,
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },



})
