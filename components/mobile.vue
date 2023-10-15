<template>
    <div class="absolute top-10">
    <fav-notif :notif="notifFav" :width="width"  />
<failure-notif :notif="notifFail" :width="width" />
</div>
<div class="relative md:hidden block ml10 w-full pb-[40em] overflow-hidden">
    <div v-if="userStore.homeLoading" class="flex animate-pulse flex-row-reverse mx-auto w-fit items-center hscreen">
    <span class="text-xl font-bold">Loading, please wait...</span>
    <div class="relativ right-10em]"><svg  class="absolut top-[50%] translate-y[-50%] left-[-4em] w-[4em] " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#1b1c1c" stroke-width="5" r="17.5" stroke-dasharray="82.46680715673208 28.48893571891069">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg></div>
</div>

    <ul v-else class=" gri flex flex-col gridcols-1 gap-[37em] w-full pl8 py-8 relative ml-10">
    <li v-for="(item, index) in userStore.availableItems" :key="index"  class="cursor-pointer relative flex flex-col gap-3 h-20 md:w-auto md:h-auto ">
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

const userStore = useUserStore()

const { fetchMore } = fetchApi()
onMounted(()=>{
    window.addEventListener('touchmove', handleScroll)
})

import { debounce } from 'lodash'
const handleScroll = debounce(()=>{
    const scrollHeight = document.documentElement.scrollHeight;
const scrollTop =  document.documentElement.scrollTop;
const clientHeight = window.innerHeight || document.documentElement.clientHeight;

    
    if(scrollTop + clientHeight >= scrollHeight - 20){
        
            
        if(!userStore.searchTerm){
            
            fetchMore()
           
               }else{
                   onPage.value++
                   fetchMoreOfSearched(`${userStore.searchTerm}`, onPage.value)
                  
               }
         
    }
}, 400)

const truncated = ref(true)

const downloadImage = async (src)=>{
    
    // const link = document.createElement('a')
    // link.href = src;
    // const currentDate = new Date().toISOString().slice(0, 10)
    // link.download = `PhotoFolio_${currentDate}.jpg`
    // link.setAttribute('target', '_blank'); // Open in a new tab
    // link.setAttribute('rel', 'noopener noreferrer');
    // link.click()

     await fetch(src).then(res=> res.blob()).then(data=>{
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(data)
        anchor.download = data
        anchor.click()
    }).catch(()=>{
        alert('something went wrong!')
    })



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

//for adding to favorite items

//for adding to favorite items
const notifFav = ref(false)
const notifFail = ref(false)
const width = ref(100)
const addFav = (image,imgMed, profImg, username, desc,likes, src, published)=>{
    if(!userStore.favItems.some(item => item.image === image )){

    
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
    // userStore.notifFav = true
    width.value = 100
    notifFav.value = true
    const intervall = setInterval(() => {
        width.value--;
        if(width.value === 0){
            notifFav.value = false
            clearInterval(intervall)
        }
    }, 60);
}else{
    width.value = 100
    notifFail.value = true
    const intervall = setInterval(() => {
        width.value--;
        if(width.value === 0){
            notifFail.value = false
            clearInterval(intervall)
        }
    }, 60);
}

}
</script>