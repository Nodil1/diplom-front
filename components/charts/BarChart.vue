<template>
    <canvas ref="chart"></canvas>

</template>

<script setup lang="ts">
import {Chart, registerables} from "chart.js";

const chart = ref()

const props = defineProps<{
    data: Array<number>,
    labels: string[],
    label: string
}>()


onMounted(() => {
    console.log(chart)
    new Chart(chart.value, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: [{
                label: props.label,
                data: props.data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {

                y: {
                    ticks:{
                        stepSize: 1
                    },

                    beginAtZero: true
                }
            }
        }
    });

})
</script>

<style scoped>

</style>