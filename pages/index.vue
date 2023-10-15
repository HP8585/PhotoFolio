<template>
<!-- <div :class="{'translate-x-0': notif, 'translate-x-[100%]': !notif}" class="duration-200 fixed"> -->
<fav-notif :notif="notifFav" :width="width"  />
<failure-notif :notif="notifFail" :width="width" />
<!-- </div> -->

<div class="mx-auto w-auto h-screen ">
    <!-- <auto-typer/> -->
<div class="relative">
    <img src="../assets/photo1.avif" class="w-full h-[25em] object-cover">
    <div class=" flex flex-col items-center justify-center absolute w-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        <h1 class="text-white text-center flex gap-1.5 items-center justify-center text-[2.3rem] md:text-[4rem] ">PhotoFolio <span class="text-[1rem] md:text-[1.5rem]">is</span> <span class=" text-sm md:text-[1.3rem] relative"><auto-typer/></span></h1>
        
        
        <div class="w-full flex justify-center items-center absolut left-[50%] translate-x-[-50% top-0 translatey-[-50%]">
        <div class="relative">
            <i class="fa fa-search cursor-pointer text-gray-700 border-r pr-2 border-r-gray-400 absolute left-0 translate-x-[50%] top-0 translate-y-[-50%] text-2xl  " />
        </div>
        
        
        <input v-model="searchTerm"  type="text" class="w-[70%] h-10 py-2 px-[4rem] rounded-md outline-none" placeholder="Search for image...">
    
        <div class="relative right-10em]"><svg v-show="userStore.isSearchLoading" class="absolute top-[50%] translate-y-[-50%] left-[-4em] w-[4em] " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#1b1c1c" stroke-width="5" r="17.5" stroke-dasharray="82.46680715673208 28.48893571891069">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg></div>


    </div>
  

    <p class="md:w-[50em] py-4 px-5 md:px-0 text-center text-white text-[.8rem] md:text-[1rem]">
        PhotoFolio: Where the art of photography meets the power of storytelling. Immerse yourself in a captivating visual journey as you explore our curated collection of stunning images. From breathtaking landscapes to intimate portraits, PhotoFolio is your gateway to a world of creativity and inspiration. Discover the beauty of moments frozen in time, each photograph telling a unique story. Whether you're a professional photographer or an avid enthusiast, our platform provides a space to showcase your talent, connect with fellow artists, and share your passion with the world. Join us on PhotoFolio and let your images speak volumes.
    </p>
    </div>
</div>
<div class="flex flex-col gap-0">
   <!-- <carousel/>
   
   <carousel-2 class="mt-[-2em]" /> -->
</div>

<!--main content-->
<div class="relative md:block hidden">
    <div v-if="userStore.homeLoading" class="flex animate-pulse flex-row-reverse mx-auto w-fit items-center hscreen">
    <span class="text-xl font-bold">Loading, please wait...</span>
    <div class="relativ right-10em]"><svg  class="absolut top-[50%] translate-y[-50%] left-[-4em] w-[4em] " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#1b1c1c" stroke-width="5" r="17.5" stroke-dasharray="82.46680715673208 28.48893571891069">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg></div>
</div>
<ul v-else class=" grid grid-cols-1 md:grid-cols-4 gap-[26em] md:gap-5 px-8 py-8 relative mx-0">
<li @click.stop="userStore.isWindowShown = index; userStore.shown = true" @mouseenter="isHovering = index" @mouseleave="isHovering = -1" v-for="(item, index) in userStore.availableItems" :key="index"  class="cursor-pointer w-22em] w10 h-20 md:w-auto md:h-auto ">
    <image-modal  :item="item" v-show="userStore.isWindowShown === index && userStore.shown === true" />
    <div class="relative w-[22em] h-[30em]">
    <img :src="item?.urls?.regular" class="w-full h-full object-cover">
<div  class="text-white overflow-y-hidden absolute top-0 w-full h-full flex flex-col justify-between" :class="isHovering === index ? 'shadow-hovered': ''" >
    <div :class="isHovering === index ? 'translate-y-0':'translate-y-[-4em]'" class="duration-500 flex justify-between items-center w-full px-3 py-3 ">
        <div class="flex items-center gap-3">
            <img :src="item?.user?.profile_image?.medium" class="w-10 rounded-full">
            <span class="text-[1rem]">{{ item?.user?.username }}</span>
        </div>
        <div class="flex gap-1">
            <span class="bg-gray-50 text-red-600 px-2 py-1 rounded"><i class="fa fa-heart"/><span>{{ item?.likes }}</span></span>
            <span @click.stop="addFav(item?.urls?.regular, item?.urls?.full, item?.user?.profile_image?.medium, item?.user?.username, item?.description,item?.likes, item?.links?.download, item?.created_at)" class="bg-gray-50 text-gray-800 px-2 py-1 rounded"><i class="fa fa-plus" /></span>
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
<div  class="relative right-10em]"><svg v-show="userStore.bottomLoading" class="absolut top-[50%] translatey-[-50%] left-[-4em] w-[4em] " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#1b1c1c" stroke-width="5" r="17.5" stroke-dasharray="82.46680715673208 28.48893571891069">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg></div>
<mobile/>

</div>

</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const isHovering = ref(-1)


const searchTerm = ref('')
const { fetchRandomHome, searchItem, fetchMore, fetchMoreOfSearched } = fetchApi()

onMounted(()=>{
    alert('This project is all made by HP(Hussain Panahy)')
    console.log('This project is all made by HP(Hussain Panahy)')
    userStore.homeLoading = true
    setTimeout(() => {
        if(searchTerm.value === ''){
            fetchRandomHome()
            userStore.isSearchLoading = false
            if(userStore.availableItems){
              
            }
            
        }else{
            
            searchItem(`${searchTerm.value}`)
        }
        
       
    }, 2000);

  
        
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', ()=> userStore.shown = false)
})

// import { debounce } from 'lodash'
setInterval(() => {
    
    handleScroll()
}, 10000);

const onPage = ref(2)
const handleScroll = ()=>{
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight >= scrollHeight - 20){
        userStore.bottomLoading = true
        if(!searchTerm.value){
            userStore.bottomLoading = true
     fetchMore()

    
        }else{
            onPage.value++
            fetchMoreOfSearched(`${searchTerm.value}`, onPage.value)
          
        }
            
    }
}

   watch(()=>searchTerm.value, ()=>{
    userStore.isSearchLoading = true
    userStore.searchTerm = searchTerm.value
    setTimeout(() => {
        if(searchTerm.value){
            
            searchItem(`${searchTerm.value}`)
        }else{
            userStore.isSearchLoading = false
            fetchRandomHome()
        }
    }, 3000);
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

<style>
.shadow-hovered {
  box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);
}
</style>

<!-- style="box-shadow: inset 0 4em 20px rgba(0, 0, 0, 0.5), inset 0 -4em 20px rgba(0, 0, 0, 0.5);" -->