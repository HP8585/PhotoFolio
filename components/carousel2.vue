<template>

    <div @mousedown="dragStart" @mousemove="dragging" @mouseup="dragStop" class="flex carr overflow-x-scroll  gap-5 w-full py-4" :ref="getEl">
    <template v-for="(n, i) in images" :key="i" >
            <div class="flex shrink-0 flex-col items-center gap-3">
                <img :src="n.urls.thumb"  class="h-20 w-20 runded-full object-cover" draggable="false">
              
            </div>
        
            </template>
        </div>
    </template>
    
    <script setup>
    
    const carousel = ref(null);
    const getEl = (el) => {
      if (el) {
        carousel.value = el;
      }
    };
    
    
    //carousel
    
    const isDragging = ref(false);
    let startX = 0;
    let startScrollLeft = 0;
    
    
    
    const dragStart = (e) => {
      isDragging.value = true;
      startX = e.pageX;
      startScrollLeft = carousel.value.scrollLeft;
      
    };
    
    const dragging = (e) => {
      if (!isDragging.value) return;
      carousel.value.scrollLeft = startScrollLeft - (e.pageX - startX);
     
    };
    
    const dragStop = () => {
      isDragging.value = false;
    };
    
    const images = ref(null)
    const retryCount = ref(0)
    const fetchCarouselItems = async()=>{
        try{
          const { data } = await useFetch(`https://api.unsplash.com/photos/random?count=80&client_id=dmgoy3S2JSr1VvfuhlU_hWoRM2rGv4XK6nQrmpRB9fw`)
        if(data.value){
            images.value = data.value
           
        }
        
        }catch(error){
          if(error.response && error.response?.status === 403 && retryCount.value < 1){
                    apiKey.value = 'AmudBFL73wvZtnJC2gg5jhn2IylFAdH0kqBAr5hkgaA'
                    retryCount.value ++;
                    
                    setTimeout(() => {
                        fetchRandomHome() 
                    }, 2000);
                    
                    
                }else if(error.response && error.response?.status === 403 && apiKey.value === 'AmudBFL73wvZtnJC2gg5jhn2IylFAdH0kqBAr5hkgaA' && retryCount.value < 2){
                    apiKey.value = 'GkEzvo66_knd69k-GSJ9PGdszQ1q3ve2-3trVQtfuuQ'
                    retryCount.value++;
                     await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchRandomHome())
                }
        }
    }
    onMounted(()=>{
        setTimeout(() => {
            fetchCarouselItems()
        }, 2000);
    
    
    
    })
    </script>