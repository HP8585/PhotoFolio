<template>
   
   <div class="md:block hidden">
   
 <contact :item="item" />

<div class="mx-auto w-fit max-w-[70em] flex gap-10 items-center py-12 relative md:block">
    
    <div class="flex gap-10 ">
        <img class="w-[10em] max-h-[10em] rounded-full" :src="item?.profile_image.large">
    
    <!--information-->
    <div class="flex flex-col text-gray-400 ">
 
        <!--username and info-->
        <div class="flex gap-20 justify-between items-center text-gray-500">
            <!-- <h1 class="text-3xl font-bold text-black mr-20">{{ item?.name }}</h1> -->
            <h1 class="text-3xl font-bold text-black mr-20">{{ item?.username }}</h1>
            <div class="flex gap-3 items-center text-xl">
                <i @click="userStore.contact = true" class="fa-solid fa-envelope border rounded px-2 py-1 hover:text-black hover:border-black duration-300 cursor-pointer" />
                <i @click.stop="isMenuShown = !isMenuShown" class="fa-solid fa-ellipsis border rounded px-2 py-1 hover:text-black hover:border-black duration-300 cursor-pointer" />
            </div>
          
        </div>
        <div class=" mt-2 flex gap-10 items-center justify-cente text-xl">
            <div class="flex flex-col items-center cursor-pointer">
                <div @click="navigateTo(`/followers/${item?.username}`)" class="flex items-center gap-1">
                    <i class="fa-solid fa-users" />
                <span class="text-lg ">{{ formattedFollowers }}</span>
                </div>
                
                <span class="text-sm">Followers</span>
            </div>

            <div @click="navigateTo(`/following/${item?.username}`)" class="flex flex-col items-center cursor-pointer">
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-user" />
                <span class="text-lg ">{{ item?.following_count }}</span>
                </div>
                <!-- <i class="fa-solid fa-user" /> -->
                <!-- <span class="text-lg ">{{ item?.following_count }}</span> -->
                <span class="text-sm ">Following</span>
            </div>
        </div>
        <div v-show="isMenuShown" class="relativ absolute top-[32%] right-0 transition-transform duration-200 cubic-bezier[0.24, 0.22, 0.015, 1.56] transition-opacity duration-100 ease-in-out" style="transition: transform 200ms cubic-bezier(0.24, 0.22, 0.015, 1.56) 0s, opacity 100ms ease-in-out 0s;">
            
                <ul class="absolute mt-1 rounded right-0 border border-gray500 px-3 py-2 bg-white shadow-xl">
                     <div class="w-2 h-2 absolute right-[10px] top-[-.3em] bg-white border-gray-300 border-t border-l  bordertransparent borde border-sold transform rotate-45"/>
                    <div class="bg-red-600 relatie" style="position: absolute; left: 0px; transform: translate3d(106.4px, 0px, 0px); bottom: calc(100% - 1px);"><div class="ZketX pzw6r"></div><div class="cJK05" style="border-bottom-color: rgb(255, 255, 255);"></div></div>
                    <li v-show="item?.social?.instagram_username" @click="goToInstagram(item?.social?.instagram_username)" class="border-b flex items-center gap-2  font-semibold cursor-pointer hover:bg-gray-200 duration-200 py-1 px-1 mt-1 rounded ">
                        <i class="fa-brands fa-instagram" />
                        <span>Instagram</span>
                    </li>
                    <li v-show="item?.social?.twitter_username" @click="goToTwitter(item?.social?.twitter_username)" class="border-b flex items-center gap-2  font-semibold cursor-pointer hover:bg-gray-200 duration-200 py-1 px-1 mt-1 rounded ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#9CA3AF" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                        <span>X</span>
                    </li>
                    <li class="text-red-600 font-semibold cursor-pointer hover:bg-gray-200 duration-200 py-1 px-1 mt-1 rounded ">
                        <span>Report</span>
                    </li>
                </ul>
                
            </div>
        <!--Biography-->
        <h1 class="text-[1.1rem] pt-3 font-bold text-black mr20">{{ item?.name }}</h1>
        <div class="pb-3 pt-1.5">
            <p class="text-black text-[1rem]">{{ item?.bio }}</p>
        </div>
        <div >
            
            <ul class="flex  flex-col gap-1">
                <li class="flex items-center gap-2 " :class="item?.for_hire ? 'text-blue-600': 'text-red-600'">
                    <i class="fa fa-circle-check" />
                    <span >{{ item?.for_hire ? 'Available for hire': 'Unavailable for hire' }}</span>
                </li>
                <li class="flex items-center gap-2 capitalize" v-show="item?.location">
                    <i class="fa fa-location-dot" />
                    <span >{{ item?.location }}</span>
                </li>
                <!-- <li class="flex items-center gap-2">
                    <i class="fa-solid fa-link" />
                    <span>Connect With Bob</span>
                </li> -->
            </ul>
        </div>
    </div>
</div>
</div>
</div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const props = defineProps(['item'])

const { item } = toRefs(props)


const isMenuShown = ref(false)

onMounted(()=>{
    window.addEventListener('click', ()=> isMenuShown.value = false)
})

const goToInstagram = (arg)=>{
    const a = document.createElement('a')
    a.href = `https://instagram.com/${arg}?igshid=MzRlODBiNWFlZA==`;
    a.setAttribute('target','_blank')
    a.click()
}

const goToTwitter = (arg)=>{
    const a = document.createElement('a')
    a.href = `https://twitter.com/${arg}?s=09`;
    a.setAttribute('target','_blank')
    a.click()
}


//formatting followers
const formattedFollowers = computed(()=>{
    if(item.value?.followers_count > 1000){
        return `${Math.floor(item.value?.followers_count / 1000)}K`
    }else{
        return item.value?.followers_count
    }
})
</script>
