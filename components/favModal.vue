<template>
    <div class="flex flex-col items-start w-[60%] h[80%] shadow-xl absolute  left-[50%] translate-x-[-50%] bg-white px-3 py-4 z-10">
        
        <span @click.stop="userStore.shown = false" class=" cursor-pointer absolute left-[-3em] top-0"><svg width="32" height="32" fill="#fff" viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path></svg></span>
            <div class="sticky top-0 backdrop-blur-sm flex justify-between items-center w-full px-3 py-3 ">
            <div class="flex items-center gap-3" @click.stop="navigateTo(`/profile/${props.item?.user?.username}`)">
                <img :src="props.item?.profile_image" class="w-10 rounded-full">
                <span class="text-[1rem]">{{ props.item?.username }}</span>
            </div>
            <div class="flex gap-1">
                <span class="bg-gray-50 text-red-600 px-2 py-1 rounded"><i class="fa fa-heart"/><span>{{ props.item?.likes }}</span></span>
                <!-- <span class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span> -->
            </div>
    </div>
    <!--main image and contents-->
        <div class="flex flex-col items-center gap-4 w-full">
            <div class="flex flex-col items-center ">
                <img :src="props.img" class="w-auto object-cover h-[40em] mxauto ml[50%]">
            </div>
    
            <div class=" flex flex-row-reverse justify-between items-center w-full px-5 py-3 " >
                <div class="flex gap-3 items-center">
                    <span class="text-[1.1rem] text-end w-[25em] truncate textellipsis" v-if="props.item?.description">{{ props.item?.description }}</span>
                    <span class="text-[1.1rem] text-end w-[25em] truncate textellipsis" v-else>{{ props.item?.alt_description }}</span>
                    <div @click="downloadImage(props.item?.src)" class="bg-gray-50 border border-gray-400 text-gray-800 px-2 py-1 rounded"><i class="fa fa-download" /></div>
                </div>
                <div class="flex gap-6 text-center px6">
                    <div class="flex flex-col" v-show="props.item?.views">
                        <span class="text-gray-400 text-[0.9rem]">Views</span>
                        <span class="text-[1.1rem] ">{{ props.item?.views }}</span>
                    </div>
                    <div class="flex flex-col" v-show="props.item?.downloads">
                        <span class="text-gray-400 text-[0.9rem]">Downloads</span>
                        <span class="text-[1.1rem] ">{{ props.item?.downloads }}</span>
                    </div>
                </div>
    </div>
        </div>
    
        <ul class="px-2">
            <li class="flex gap-2 items-center text-gray-400" v-show="props.item?.location?.name">
                <i class="fa fa-location-dot" />
                <span>{{ props.item?.location?.name }}</span>
            </li>
            <li class="flex gap-2 items-center text-gray-400" v-show="formattedDate">
                <i class="fa-regular fa-calendar" />
                <span>{{ formattedDate }}</span>
            </li>
            <li class="flex gap-2 items-center text-gray-400" v-show="props.item?.exif?.name">
                <i class="fa fa-camera-retro" />
                <span>{{ props.item?.exif?.name }}</span>
            </li>
            <li class="flex gap-2 items-center text-gray-400">
             
                <span class="flex items-center gap-2"><svg width="16" height="16" class="ywnoU" fill="rgba(0,0,0,0.5)" viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">Safety</desc><path d="m10 14.2 6.6-6.6L18 9l-8 8-4-4 1.4-1.4 2.6 2.6ZM21 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4Zm-2 1.3-7-3.1-7 3.1V11c0 4.5 3 8.7 7 9.9 4-1.2 7-5.4 7-9.9V6.3Z"></path></svg><span class="e6qY8">Free to use under the PhotoFolio license</span></span>
            </li>
        </ul>
    </div>
    </template>
    
    <script setup>
    import { useUserStore } from '~/stores/user'
    const userStore = useUserStore()
    
    const props = defineProps(['item', 'img'])
    
    const Published = ref(props.item?.created_at)
    const currentDate = new Date();
    
    const timeDifference = currentDate - new Date(Published.value)
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    
    const formattedDate = ref()
    
    if(daysDifference === 0){
        formattedDate.value = "Today"
    } else if(daysDifference === 1){
        formattedDate.value = 'Yesterday'
    }else{
        formattedDate.value = `${daysDifference} days ago`
    }
    
    
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