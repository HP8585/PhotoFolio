<template>
    
    <div class="absolute z-20 flex flex-col gap-6 rounded-sm bg-gray-900 text-white px-3 py-4  left-[50%] translate-x-[-50%] top-[50%] translate-y-[50%]">
        <p>Are you sure that you want to delete {{ props.digit }} {{ props.digit > 1 ? 'images' : 'image' }}?</p>
        <div class="flex justify-between w-[5.5em] mx-auto">
            <button @click="$emit('clearSome')" class="hover:bg-gray-700 duration-200 text-white px-2 py-1 rounded-sm bg-gray-800">Yes</button>
            <button @click="userStore.clearSome = false" class="text-white hover:bg-gray-700 duration-200 px-2 py-1 rounded-sm bg-gray-800">No</button>
        </div>
    </div>

    </template>
    
    <script setup>
    import { useUserStore } from '~/stores/user'
    
    const userStore = useUserStore()

    const props = defineProps(['digit'])
    </script>