<template>
    <div>
        <NuxtLoadingIndicator/>
        <NuxtLayout >
            <NuxtPage />
        </NuxtLayout >
    </div>
</template>
<script>
import {Chart, registerables} from "chart.js";

Chart.register(...registerables)

</script>
<style>

</style>