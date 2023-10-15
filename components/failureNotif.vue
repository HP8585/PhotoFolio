<template>
    <div class="bg-white fixed z-20 rounded overflow-hidden duration-300" :class=" props.notif ? 'translate-x-[0%]' : 'translate-x-[-100%]'">
        <div class="bg-white   rounded py-2 font-bold flex items-center px-3 gap-1 asolute z-20">
            <i class="fa-solid fa-circle-xmark text-red-600" />
            <span>This item already exists!</span>
        </div>
        <div class="w-full h-1.5  bg-black" :style="`width: ${props.width}%;`" />
    </div>
    </template>
    
    <script setup>
    const props = defineProps(['width', 'notif'])
    
    </script>