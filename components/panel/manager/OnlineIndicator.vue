<template>
    <div class="dot blink">

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isOnline: Boolean
}>()
const isOnline = ref(props.isOnline)
</script>

<style scoped>
.dot {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background-color: gray;
}
.blink {
    animation: blink 5s infinite;
}
@keyframes blink {
    0% {
        background-color: rgba(39, 151, 211, 0.81);
    }
    50% {

        background-color: lightgreen;
    }
    100% {

        background-color: rgba(39, 151, 211, 0.81);
    }
}
</style>