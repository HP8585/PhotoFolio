<template>
    <div class="my-5 md:block hidden">

    <!--Photos-->

    <div class="mx-auto w-fit">
        <ul class="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-8 relative">
            <li class="cursor-pointer" v-for="(item, index) in photoItems" :key="index" @click.stop="userStore.isWindowShown = index; userStore.shown = true" @mouseenter="isHovering = index" @mouseleave="isHovering = -1">
               
                <image-modal :item="item" v-show="userStore.isWindowShown === index && userStore.shown === true" />
                <div class="relative w-[22em] h-[30em]">
    <img :src="item?.urls?.regular" class="h-full w-full object-cover">
<div  class="text-white overflow-y-hidden absolute top-0 w-full h-full flex flex-col justify-between" :class="isHovering === index ? 'shadow-hovered': ''">
    <div :class="isHovering === index ? 'translate-y-0':'translate-y-[-4em]'" class="duration-500 flex justify-between items-center w-full px-3 py-3 ">
        <div class="flex items-center gap-3">
            <img :src="props.item?.profile_image?.medium" class="w-10 rounded-full">
            <span class="text-[1rem]">{{ props.item?.username }}</span>
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

const userInfo = props.item
// const { item } = toRefs(props)

const isHovering = ref(-1)

import axios from 'axios'
const photoItems = ref(null)
const apiKey = ref('79fLKh2mPCwgUk08JdStYN7EY6r8ASsW5gzjNJuJ6SI')
const retryCount = ref(0)


const fetchUserPhotos = async()=>{
    try{
        const res = await axios.get(`https://api.unsplash.com/users/${useRoute().params.id}/photos?client_id=${apiKey.value}`)

if(res){
    photoItems.value = res.data
   
}
    } catch(error){

        if(error.response && error.response?.status === 403 && retryCount.value < 1){
                apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
                retryCount.value ++;
               
                setTimeout(() => {
                    fetchUserPhotos() 
                }, 2000);
                
                
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retryCount.value < 2){
                apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
                retryCount.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserPhotos())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retryCount.value < 3){
                apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserPhotos())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retryCount.value < 4){
                apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserPhotos())
            }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retryCount.value < 5){
                apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
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

    window.addEventListener('click', ()=> userStore.shown = false)
})



const downloadImage = async (src)=>{
    const now = new Date().getDate()
    await fetch(src).then(res=> res.blob()).then(data=>{
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(data)
        anchor.download = `${now}_PhotoFolio`
        anchor.click()
    }).catch(()=>{
        alert('something went wrong!')
    })

}
</script>

<style>
.shadow-hovered {
  box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);
}
</style>