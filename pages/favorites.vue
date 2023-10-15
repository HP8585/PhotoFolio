<template>
    
    <fav-mobile/>
<div class="relative md:block hidden">
    <div class="absolute top-[20%]  z-20 w-[100em]">
        <clear-some @clearSome="doClearSome" v-show="userStore.clearSome" :digit="indices.length"/>
        <clearAll  @clearAll="clearAllItems" v-show="userStore.clearAll" />
</div>

<div class="flex flex-row-reverse justify-between items-center px-6">
    <div class="flex items-center text-xl py-2 px-1 text-gray-400 gap-2 flex-row-reverse ">
       <button :disabled="onSelectMode" @click="userStore.clearAll = true"> <i   class="fa fa-trash hover:text-black duration-200 cursor-pointer" /></button>
        <i @click="onSelectMode = !onSelectMode" class="fa fa-list-check hover:text-black duration-200 cursor-pointer" />
    </div>
    <span @click="userStore.clearSome = !userStore.clearSome" v-show="onSelectMode && indices.length > 0" class="font-semibold cursor-pointer text-lg bg-gray-900 text-white px-2 rounded-sm">Delete {{ indices.length }} {{ indices.length < 2 ? 'item' : 'items' }}</span>
</div>
    <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 px-8 py-8 relative ">
    <li @click.stop="userStore.isWindowShown = index; userStore.shown = true" @mouseenter="isHovering = index" @mouseleave="isHovering = -1" v-for="(item, index) in itemss" :key="index"  class="cursor-pointer w-22em] h-auto ">
        <fav-modal :img="item?.imageMedium" :item="item" v-show="userStore.isWindowShown === index && userStore.shown === true" />
        <input v-show="onSelectMode" class=" accent-black w-[1.2em] h-10" type="checkbox" @click.stop="addToList(item?.username)">
        <div class="relative w-[22em] h-[30em]">
        <img :src="item?.image" class="w-full h-full object-cover">
    <div  class="text-white overflow-y-hidden absolute top-0 w-full h-full flex flex-col justify-between" style="box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);">
        <div :class="isHovering === index ? 'translate-y-0':'translate-y-[-4em]'" class="duration-500 flex justify-between items-center w-full px-3 py-3 ">
            <div class="flex items-center gap-3">
                <img :src="item?.profile_image" class="w-10 rounded-full">
                <span class="text-[1rem]">{{ item?.username }}</span>
            </div>
            <div class="flex gap-1">
                <span class="bg-gray-50 text-red-600 px-2 py-1 rounded"><i class="fa fa-heart"/><span>{{ item?.likes }}</span></span>
                <!-- <span @click.stop="addFav(item?.urls?.regular, item?.user?.profile_image?.medium, item?.user?.username, item?.description, item?.links?.download)" class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span> -->
            </div>
    </div>
    
    <div :class="isHovering === index ? 'translate-y-0':'translate-y-[6em]'" class=" duration-500 flex justify-between items-center w-full px-3 py-3 " >
        <span class="w-[50em] truncate">{{ item?.description }}</span>
        <div @click.stop="downloadImage(item?.urls?.raw)" class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-download" /></div>
    </div>
    </div>
    </div>
    </li>
    </ul>
    
    
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const isHovering = ref(-1)

const itemss = ref(null)

const onSelectMode = ref(false)

onMounted(()=>{
    console.log('This project is all made by HP(Hussain Panahy)')
    
    const storedItems = JSON.parse(localStorage.getItem('favorites'))
    itemss.value = storedItems
    

    window.addEventListener('click', ()=> userStore.shown = false)
})


const clearAllItems = ()=>{
    localStorage.clear('favorites')
    location.reload()
}


const indices = ref([])

const addToList = (index)=>{
    const getIndex = indices.value.indexOf(index)


    if(indices.value.includes(index)){
        indices.value.splice(getIndex, 1)
    }else{
        indices.value.push(index)
    }
}

const doClearSome = ()=>{
    const favItems = JSON.parse(localStorage.getItem('favorites'))
    const updatedItems = favItems.filter((item, index)=> !indices.value.includes(item?.username))

    localStorage.setItem('favorites', JSON.stringify(updatedItems))

    location.reload()
}


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