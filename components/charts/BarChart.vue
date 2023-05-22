<template>
    <canvas ref="chart"></canvas>

</template>

<script setup lang="ts">
import {Chart, registerables} from "chart.js";
import {Ref} from "vue";

const chart = ref()
const _chart: Ref<Chart|null> = ref(null)
const props = defineProps<{
    data: ChartData[],

}>()

const createChart = () => {
    _chart.value = new Chart(chart.value, {
        type: 'bar',
        data: {
            labels: props.data[0].labels,
            datasets: props.data.map((x) => {
                return {
                    fill: 'origin',
                    label: x.label,
                    data: x.data,
                    borderWidth: 1
                }
            })
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
}

onMounted(() => {
    createChart()
})
</script>

<style scoped>

</style>