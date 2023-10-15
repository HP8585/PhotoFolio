<template>
    <div v-show="userStore.contact" class="bg-black bg-opacity-40 h-screen w-full absolute z-20 ">
   
<div class="text-black flex flex-col gap-3 px-4 py-5 rounded absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]  bg-white shadow-2xl z-20">
    <span @click.stop="userStore.contact = false" class=" cursor-pointer absolute left-[-3em] top-0"><svg width="32" height="32" fill="#fff" viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path></svg></span>
    <div class="flex items-center gap-3 text-black font-bold ">
        <img :src="item?.profile_image.large" class="rounded-full h-[3em] object-cover w-[3em]">
        <span class="md:text-2xl text-lg">Message {{ item?.username }}</span>
    </div>
    <p class="text-black ">Send a message to <span class="font-bold text-black">{{ item?.username }}</span> and receive a reply through your email.</p>
    <ul>
        <li class="text-black"><i class="fa fa-check mr-2" />Follow <span class="underline text-gray-400 cursor-pointer hover:text-black duration-200">message guidelines</span></li>
        <li class="text-black"><i class="fa fa-check mr-2" />No spam</li>
        <li class="text-black"><i class="fa fa-check mr-2" />For legal questions check our <span class="underline text-gray-400 cursor-pointer hover:text-black duration-200">Policy & Terms of use</span></li>
    </ul>


    <div class="flex flex-col gap-5">
        <div class="flex flex-col">
        <label for="title" class="font-semibold">Title :</label>
        
        <input v-model="title" type="text" id="title" class="outline-none rounded-sm border-2 border-black w-[full] h-7 px-2 py-2 font-semibold">
    </div>

    <div>
        <label class="font-semibold" for="message">Your message :</label>
        <textarea v-model="textareaa" name="message" class="px-3 py-2 font-semibold border-2 border-black rounded-sm w-full md:h-[10em]" cols="30"  style="resize: none;"></textarea>
    </div>
    </div>
    
    <div class="flex items-center justify-between w-full">
        <div/>
    <button @click="handleSent" class="px-2 py-2 rounded duration-300" :disabled="!isSendActive" :class="isSendActive ? 'bg-black text-white ': 'bg-gray-300 text-gray-400'">Send message</button>
</div>

</div>
</div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const props = defineProps(['item'])
const { item } = toRefs(props)

const textareaa = ref(null)

const title = ref(null)

const isSendActive = ref(false)

watch(()=>textareaa.value , ()=>{
    if(textareaa.value.length > 10){
         isSendActive.value = true;
        }else{
            isSendActive.value = false
        }
})

const handleSent = ()=>{
    userStore.contact = false;
    textareaa.value = null;
    title.value = null
}
</script>