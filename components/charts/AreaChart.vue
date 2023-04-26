<template>
    <canvas ref="myChart"></canvas>

</template>

<script setup lang="ts">
import {Chart, registerables} from "chart.js";

const myChart = ref()

const props = defineProps<{
    data: Array<number>,
    labels: string[],
    label: string
}>()


onMounted(() => {
    console.log(myChart)
    new Chart(myChart.value, {
        type: 'line',
        data: {
            labels: props.labels,
            datasets: [{
                fill: 'origin',
                label: props.label,
                data: props.data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

})
</script>

<style scoped>

</style>