<template>
<div class="relative md:hidden block ml10 w-full pb-[40em] overflow-hidden">
    
    <ul class=" gri flex flex-col gridcols-1 gap-[37em] w-full pl8 py-8 relative ml-10">
    <li v-for="(item, index) in photoItems" :key="index"  class="cursor-pointer relative flex flex-col gap-3 h-20 md:w-auto md:h-auto ">
        <div class="flex gap-4" @click.stop="navigateTo(`/profile/${item?.user?.username}`)">
            <img :src="props.item?.profile_image?.medium" class="rounded-full w-10 h-10">
            <div class="flex flex-col " >
                <span class="font-extrabold text-[.9rem]">{{ props.item?.username }}</span>
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
        <p @click.stop="truncated = !truncated" class="w-[80%]  truncat text-[.8rem]" :class="truncated ? 'truncate':''" v-show="item?.description">
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


import axios from 'axios'
const photoItems = ref(null)
const apiKey = ref('79fLKh2mPCwgUk08JdStYN7EY6r8ASsW5gzjNJuJ6SI')
const retryCount = ref(0)

const userInfo = props.item

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