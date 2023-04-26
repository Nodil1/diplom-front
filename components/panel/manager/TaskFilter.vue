<template>
<div class="d-flex main-gap flex-wrap">
    <v-btn-toggle
        class="margin-top"
        v-model="selectedType"
        rounded="30"
        color="blue"
        multiple
    >
        <v-btn v-for="i in taskTypes">
            {{ i }}
        </v-btn>

    </v-btn-toggle>
    <v-btn-toggle
        class="margin-top"
        v-model="selectedState"
        rounded="30"
        color="blue"
        multiple
    >
        <v-btn v-for="i in states">
            {{ i }}
        </v-btn>

    </v-btn-toggle>
    <div class="flex-break">
    </div>
    <div class="search">
        <v-text-field
            label="Поиск"
            v-model="search"
            hide-details
            placeholder="Название задачи или имя клиента"
        />
    </div>
</div>
</template>

<script setup lang="ts">
import {states, taskTypes} from "~/data/consts";
import {Ref} from "vue";
import {TaskFilterModel} from "~/models/TaskFilterModel";
const emit = defineEmits(['filterChange'])
const selectedType: Ref<number[]> = ref([])

const selectedState: Ref<number[]> = ref([])
const search = ref('')
console.log(selectedType.value)

const onChange = () => {
    const filter: TaskFilterModel = {
        search: search.value,
        types: selectedType.value,
        states: selectedState.value
    }
    emit('filterChange', filter)
}

watch(()=> selectedType.value, ()=> {
    onChange()
})
watch(()=> search.value, ()=> {
    onChange()
})
watch(()=> selectedState.value, ()=> {
    onChange()
})
onMounted(()=> {
    selectedType.value = [0,1,2]
    selectedState.value = [0,1,2]
})
</script>

<style scoped>
.search{
    width: 660px;
}
</style>