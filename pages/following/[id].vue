
<template>

<div v-if="isPageLoading" class="flex animate-pulse flex-row-reverse mx-auto w-fit items-center h-screen">
    <span class="text-xl font-bold">Loading, please wait...</span>
    <div class="relativ right-10em]"><svg  class="absolut top-[50%] translate-y[-50%] left-[-4em] w-[4em] " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#1b1c1c" stroke-width="5" r="17.5" stroke-dasharray="82.46680715673208 28.48893571891069">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg></div>
</div>

<div v-else class="py-7">
  <h1 class="text-center font-bold text-xl mb-6">{{ useRoute().params.id }}'s Following</h1>
    <ul class="flex flex-col gap5 ml-4">
        
        <li @click="navigateTo(`/profile/${item?.username}`)" class="border-b hover:bg-gray-100 py-3 px-2 cursor-pointer duration-100 flex items-center gap-5 flex-row" v-for="(item, index) in followers" :key="index">
            
            <img :src="item?.profile_image?.large" class="md:w-[4em] md:h-[4em] w-[3em] h-[3em] rounded-full">
            <div class="flex flex-col">
                <span class="font-bold">{{ item?.username }}</span>
                <span class="text-[.85rem] font-semibold">{{ item?.name }}</span>
            </div>
        </li>
    </ul>
</div>
</template>

<script setup> 
import axios from 'axios'

const isPageLoading = ref(true)

const followers = ref(null)
const log = console.log
const apiKey = ref('Mgldki_W2ajsNZfp5AmHfm2tS-i3_SWzOaTbvL1TEkk')
const fetchUserFollowers = async(username)=>{
try{
    const res = await axios.get(`https://api.unsplash.com/users/${username}/following?client_id=${apiKey.value}`) 
    if(res){
       
        isPageLoading.value = false
        followers.value = res.data
    }
} catch(error){
 log(error)
}
}

onMounted(()=>{
    fetchUserFollowers(useRoute().params.id)
    console.log('This project is all made by HP(Hussain Panahy)')
})
</script>
