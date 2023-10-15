<template>

    <div class="relative md:hidden block w-full pb-[40em] overflow-hidden">
        
        <div class="absolut top-[10%] translate-y-[-50% z-[88] w-[100em]">
            
        <clear-some class="absolute z-20 top-[20%] w-[15em] translate-y-[-50%]" @clearSome="doClearSome" v-show="userStore.clearSome" :digit="indices.length"/>
    
        <clearAll class="absolute z-20 top-[20%] w-[20em] translate-y-[-50%]"  @clearAll="clearAllItems" v-show="userStore.clearAll" />
</div>

        <div class="flex flex-row-reverse justify-between items-center px-6">
    <div class="flex items-center text-xl py-2 px-1 text-gray-400 gap-2 flex-row-reverse ">
       <button :disabled="onSelectMode" @click="userStore.clearAll = true"> <i   class="fa fa-trash hover:text-black duration-200 cursor-pointer" /></button>
        <i @click="onSelectMode = !onSelectMode" class="fa fa-list-check hover:text-black duration-200 cursor-pointer" />
    </div>
    <span @click="userStore.clearSome = !userStore.clearSome" v-show="onSelectMode && indices.length > 0" class="font-semibold cursor-pointer text-lg bg-gray-900 text-white px-2 rounded-sm">Delete {{ indices.length }} {{ indices.length < 2 ? 'item' : 'items' }}</span>
</div>
        <ul class="flex flex-col gap-[37em] w-full pl8 py-8 relative ml-10">
        <li v-for="(item, index) in itemss" :key="index"  class="cursor-pointer relative flex flex-col gap-3 h-20 md:w-auto md:h-auto ">
            <input v-show="onSelectMode" class=" accent-black w-[1.2em] h-10" type="checkbox" @click.stop="addToList(item?.username)">
            <div class="flex gap-4" @click.stop="navigateTo(`/profile/${item?.user?.username}`)">
                <img :src="item?.profile_image" class="rounded-full w-10 h-10">
                <div class="flex flex-col " >
                    <span class="font-extrabold text-[.9rem]">{{ item?.username }}</span>
                    <span class="text-[.7rem]">{{ item?.name }}</span>
                </div>
            </div>
            <div>
                <img :src="item?.image" class="w-[80%] h-[30em] max-h-[30em] object-cover">
            </div>
    
            <div class="flex flex-row-reverse justify-between w-[80%] gap-3">
                <div class="flex flex-row-reverse gap-3">
                <span class="bg-gray-50 shadow text-red-600 px-2 py-1 rounded flex items-center gap-1"><i class="fa fa-heart"/><span>{{ item?.likes }}</span></span>
                <!-- <span @click.stop="addFav(item?.urls?.regular, item?.urls?.full, item?.user?.profile_image?.medium, item?.user?.username, item?.description,item?.likes, item?.links?.download, item?.created_at)" class="bg-gray-50 shadow text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span> -->
            </div>
            <div @click.stop="downloadImage(item?.image)" class="bg-gray-50 shadow text-gray-800 px-2 py-1 rounded"><i class="fa fa-download" /> <span class="ml-1">Download</span></div>
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
const userStore = useUserStore()

const props = defineProps(['item'])



const truncated = ref(true)
// const { item } = toRefs(props)



const itemss = ref(null)

const onSelectMode = ref(false)

onMounted(()=>{
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