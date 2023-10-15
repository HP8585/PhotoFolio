<template>
   <div v-show="userStore.contact" class="bg-black bg-opacity-40 h-screen w-full absolute z-20 md:hidden block">
 <contact :item="item" />
</div>
<div class="md:hidden bloc">
    <div class="flex justify-between px-4 py-12">
    <div>
        <img class="w-[7em] h-[7em]  rounded-full" :src="item?.profile_image.large">
    </div>
    <div class="text-gray-400 mt-2 flex gap-10 items-center justify-cente text-xl">
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
    <i @click.stop="isMenuShown = !isMenuShown" class="fa-solid fa-ellipsis text-xl border rounded px-2 py-1 h-fit duration-300 cursor-pointer" />
</div>
<div class="px-5 flex flex-col gap-1">
    <div class="flex flex-col">
<span class="font-extrabold text-lg">
    {{ item?.username }}
</span>
<small>{{ item?.name }}</small>
</div>
<p class="mb5">{{ item?.bio }}</p>

<span @click="userStore.contact = true" class="text-gray-400 text-sm mb-2"><i class="fa-solid fa-link" /> Connect with {{ item?.username }} </span>
</div>
<div v-show="isMenuShown" class=" absolute top-[15%] right-5 transition-transform duration-200 cubic-bezier[0.24, 0.22, 0.015, 1.56] transition-opacity duration-100 ease-in-out" style="transition: transform 200ms cubic-bezier(0.24, 0.22, 0.015, 1.56) 0s, opacity 100ms ease-in-out 0s;">
            
            <ul class="absolute mt-1 rounded right-0 border border-gray500 px-3 py-2 bg-white shadow-xl text-gray-400">
                 <div class="w-2 h-2 absolute right-[10px] top-[-.3em] bg-white border-gray-300 border-t border-l  bordertransparent borde border-sold transform rotate-45"/>
                <div class="bg-red-600 relatie" style="position: absolute; left: 0px; transform: translate3d(106.4px, 0px, 0px); bottom: calc(100% - 1px);"><div class="ZketX pzw6r"></div><div class="cJK05" style="border-bottom-color: rgb(255, 255, 255);"></div></div>
                <li v-show="item?.social?.instagram_username" @click="goToInstagram(item?.social?.instagram_username)" class="border-b flex items-center gap-2  font-semibold cursor-pointer py-1 px-1 mt-1 rounded ">
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