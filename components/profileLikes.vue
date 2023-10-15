<template>
    <div class="my-5">

    <!--Photos-->

    <div class="mx-auto w-fit">
        <ul class="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-8 relative">
            <li class="cursor-pointer" v-for="(item, index) in photoItems" :key="index" @click="userStore.isWindowShown = index; userStore.shown = true" @mouseenter="isHovering = index" @mouseleave="isHovering = -1">
               
                <image-modal :item="item" v-show="userStore.isWindowShown === index && userStore.shown === true" />
                <div class="relative w-[22em] h-[30em]">
    <img :src="item?.urls?.regular" class="h-full w-full object-cover">
<div  class="text-white overflow-y-hidden absolute top-0 w-full h-full flex flex-col justify-between" :class="isHovering === index ? 'shadow-hovered': ''">
    <div :class="isHovering === index ? 'translate-y-0':'translate-y-[-4em]'" class="duration-500 flex justify-between items-center w-full px-3 py-3 ">
        <div class="flex items-center gap-3">
            <img :src="item?.user?.profile_image?.medium" class="w-10 rounded-full">
            <span class="text-[1rem]">{{ item?.user?.username }}</span>
        </div>
        <div class="flex gap-1">
            <span class="bg-gray-50 text-red-600 px-2 py-1 rounded"><i class="fa fa-heart"/><span>{{ item?.likes }}</span></span>
            <span class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span>
        </div>
</div>

<div :class="isHovering === index ? 'translate-y-0':'translate-y-[6em]'" class=" duration-500 flex justify-between items-center w-full px-3 py-3 " >
    <span class="w-[50em] truncate">{{ item?.alt_description }}</span>
    <!-- <div></div> -->
    <div @click.stop="downloadImage(item?.urls?.raw)"  class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-download" /></div>
</div>
</div>
</div>
            
            </li>
        </ul>
    </div>
</div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore= useUserStore()

const props = defineProps(['item'])

const userInfo = props?.item
// const { item } = toRefs(props)

const isHovering = ref(-1)

import axios from 'axios'
const photoItems = ref(null)
const apiKey = ref('dmgoy3S2JSr1VvfuhlU_hWoRM2rGv4XK6nQrmpRB9fw')
const retryCount = ref(0)


const fetchUserPhotos = async()=>{
    try{
        const res = await axios.get(`https://api.unsplash.com/users/${useRoute().params.id}/likes?client_id=${apiKey.value}`)

if(res){
    photoItems.value = res.data
   
}
    } catch(error){

      if(error.response && error.response?.status === 403 && apiKey.value === 'dmgoy3S2JSr1VvfuhlU_hWoRM2rGv4XK6nQrmpRB9fw' && retryCount.value < 2){
                apiKey.value = 'AmudBFL73wvZtnJC2gg5jhn2IylFAdH0kqBAr5hkgaA'
                retryCount.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserPhotos())
            } else{
                // alert('sorry but we failed fetching data from the server, please try again later!')
            }
    }
}
onMounted(()=>{
    userStore.shown = false
    setTimeout(async () => {
        fetchUserPhotos()
    }, 1200);
})


const downloadImage = (src)=>{
    
    const link = document.createElement('a')
    link.href = src;
    const currentDate = new Date().toISOString().slice(0, 10)
    link.download = `PhotoFolio_${currentDate}`
    link.setAttribute('target', '_blank'); // Open in a new tab
    link.setAttribute('rel', 'noopener noreferrer');
    link.click()

    
}
</script>

<style>
.shadow-hovered {
  box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);
}
</style>


