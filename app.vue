<template>
    <div>
        <NuxtLoadingIndicator/>
        <NuxtLayout >
            <NuxtPage :transition="{
        name: 'layout',
        mode: 'out-in'
        }"/>
        </NuxtLayout >
    </div>
</template>
<script>
import {Chart, registerables} from "chart.js";

Chart.register(...registerables)

</script>
<style>
.layout-enter-active,
.layout-leave-active {
    transition: all 0.2s;
}
.layout-enter-from,
.layout-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
}
</style>