<template>
<div class="bg-white m-0 fixed z-20 rounded overflow-hidden duration-300 whitespace-nowrap text-[.9rem] shadow w-[55%] md:w-fit" :class=" props.notif ? 'translate-x-[0%]' : 'translate-x-[-103%]'">
    <div class="bg-white   rounded py-2 font-bold flex items-center px-3 gap-1 asolute z-20">
        <i class="fa-solid fa-circle-check text-green-600" />
        <span>Image successfully added </span>
    </div>
    <div class="w-full h-1.5  bg-black" :style="`width: ${props.width}%;`" />
</div>
</template>

<script setup>
const props = defineProps(['width', 'notif'])

</script>