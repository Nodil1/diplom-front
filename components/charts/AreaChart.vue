<template>
    <canvas ref="myChart"></canvas>

</template>

<script setup lang="ts">
import {Chart, registerables} from "chart.js";
import {Ref} from "vue";

const myChart = ref()
const _chart: Ref<Chart | null> = ref(null)

const props = defineProps<{
    data: ChartData[],
    secondAxis?: ChartData[]

}>()
const createChart = () => {
    let firstAxis = props.data.map((x) => {
        return {
            fill: 'origin',
            label: x.label,
            data: x.data,
            yAxisID: 'y',
            borderWidth: 1
        }
    })
    if (props.secondAxis) {
        let secondAxis = props.secondAxis.map((x) => {
            return {
                fill: 'origin',
                yAxisID: 'y1',
                label: x.label,
                data: x.data,
                borderWidth: 1
            }
        })
        firstAxis = [...firstAxis, ...secondAxis];
    }
    _chart.value = new Chart(myChart.value, {
        type: 'line',
        data: {
            labels: props.data[0].labels,
            datasets: firstAxis
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
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