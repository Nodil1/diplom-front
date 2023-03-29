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