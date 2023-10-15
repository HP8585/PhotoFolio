<template>

<profile-skeleton v-if="skeletonOn" class="md:block hidden" />
<skeleton-mobile v-if="skeletonOn" class="md:hidden block" />
<div v-else class="ml10 text-gray-400 pb-3 border-b border-b-gray-300">
    
<profile-main :item="item" class="md:block hidden" />
<p-main-mobile :item="item" class="md:hidden block" />
        <ul class="flex gap-8 ml-5">
            <li @click="userStore.onPage = 'photos'" class="hover:text-black duration-200 cursor-pointer" :class="userStore.onPage === 'photos'?'text-black border-b-4 border-b-black rounded': ''">
                <i class="fa-solid fa-image " />
                <span> Photos <span>{{ item?.total_photos }}</span></span>
            </li>
            <li @click="userStore.onPage = 'likes'" class="hover:text-black duration-200 cursor-pointer" :class="userStore.onPage === 'likes'?'text-black border-b-4 border-b-black rounded': ''">
                <i class="fa-solid fa-heart" />
                <span> Likes <span>{{ item?.total_likes }}</span></span>
            </li>
        </ul>
    </div>
   <profile-photos :item="item" v-show="userStore.onPage === 'photos'"/>
   <photo-mobile :item="item" v-show="userStore.onPage === 'photos'" />
    <profile-likes :item="item" v-show="userStore.onPage === 'likes'" class="md:block hidden" />
    <mobile-likes :item="item" v-show="userStore.onPage === 'likes'" class="md:hidden block" />
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()


import axios from 'axios'
const route = useRoute()
const log = console.log

const skeletonOn = ref(true)

const item = ref(null)
const apiKey = ref('stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8')
const retryFetchMore = ref(0)
const fetchUserData = async ()=>{
    try{
        const res = await axios.get(`https://api.unsplash.com/users/${route.params.id}?client_id=${apiKey.value}`)
    
    if(res){
        item.value = res.data
        log('kak koko',item.value)
        skeletonOn.value = false
    }
    }catch(error){
        if(error.response && error.response?.status === 403 && retryFetchMore.value < 1){
                apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserData())
                
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retryFetchMore.value < 2){
                apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
                retryFetchMore.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserData())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retryFetchMore.value < 3){
                apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserData())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retryFetchMore.value < 4){
                apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserData())
            }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retryFetchMore.value < 5){
                apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchUserData())
            } else{
                // alert('sorry but we failed fetching data from the server, please try again later!')
            }
    }
}

onMounted(()=>{
    console.clear()
    console.log('This project is all made by HP(Hussain Panahy)')
    setTimeout(() => {
        console.clear()
    console.log('This project is all made by HP(Hussain Panahy)')
    }, 3000);
setTimeout(async () => {
  fetchUserData()
}, 2000);
})
</script>

