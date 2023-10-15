<template>
    <div class="relative md:hidden block ml10 w-full pb-[40em] overflow-hidden">
        
        <ul class=" gri flex flex-col gridcols-1 gap-[37em] w-full pl8 py-8 relative ml-10">
        <li v-for="(item, index) in photoItems" :key="index"  class="cursor-pointer relative flex flex-col gap-3 h-20 md:w-auto md:h-auto ">
            <div class="flex gap-4" @click.stop="navigateTo(`/profile/${item?.user?.username}`)">
                <img :src="item?.user?.profile_image?.medium" class="rounded-full w-10 h-10">
                <div class="flex flex-col " >
                    <span class="font-extrabold text-[.9rem]">{{ item?.user?.username }}</span>
                    <span class="text-[.7rem]">{{ item?.user?.name }}</span>
                </div>
            </div>
            <div>
                <img :src="item?.urls?.regular" class="w-[80%] h-[30em] max-h-[30em] object-cover">
            </div>
    
            <div class="flex flex-row-reverse justify-between w-[80%] gap-3">
                <div class="flex flex-row-reverse gap-3">
                <span class="bg-gray-50 shadow text-red-600 px-2 py-1 rounded flex items-center gap-1"><i class="fa fa-heart"/><span>{{ item?.likes }}</span></span>
                <span @click.stop="addFav(item?.urls?.regular, item?.urls?.full, item?.user?.profile_image?.medium, item?.user?.username, item?.description,item?.likes, item?.links?.download, item?.created_at)" class="bg-gray-50 shadow text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span>
            </div>
            <div @click.stop="downloadImage(item?.urls?.raw)" class="bg-gray-50 shadow text-gray-800 px-2 py-1 rounded"><i class="fa fa-download" /> <span class="ml-1">Download</span></div>
            </div>
    
            <div class="mb10">
            <p @click.stop="truncated = !truncated" class="w-[80%]  truncat z-20 text-[.8rem]" :class="truncated ? 'truncate':''" v-show="item?.description">
                {{ item?.description }}
            </p>
            <small class="text-gray-400 ">{{ published(item?.created_at) }}</small>
        </div>
        </li>
        </ul>
        
        
        </div>
    </template>
<script setup>
import { useUserStore } from '~/stores/user'
const userStore= useUserStore()

const props = defineProps(['item'])

const userInfo = props?.item

const truncated = ref(true)
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



//for adding to favorite items

const addFav = (image,imgMed, profImg, username, desc,likes, src, published)=>{
    const existingItems = JSON.parse(localStorage.getItem('favorites')) || [];

    userStore.favItems = existingItems
    const newItem = {
        image: image,
        imageMedium: imgMed,
        likes: likes,
        profile_image: profImg,
        username: username,
        description: desc,
        src: src,
        created_at: published
    };
    userStore.favItems.unshift(newItem)
    localStorage.setItem('favorites', JSON.stringify(userStore.favItems))
}


//this is for date formatting
const currentDate = new Date();
const published = (item)=>{
const timeDifference = currentDate - new Date(item)
const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
if(daysDifference === 0){
    return "Today"
} else if(daysDifference === 1){
    return 'Yesterday'
}else{
    return `${daysDifference} days ago`
}
}
</script>

<style>
.shadow-hovered {
  box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);
}
</style>    