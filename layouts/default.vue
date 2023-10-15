<template>
<header class=" sticky top-0 z-10 flex justify-between bg-gray-800 text-white py-2 px-6">
    <div @click="navigateTo('/favorites')" class="cursor-pointer hover:bg-gray-700 px-2 rounded-full py-0.5 duration-200"><i class="fa-regular fa-bookmark text-xl" /></div>
    
    <div>PhotoFolio</div>

    <div></div>
</header>
<slot/>
</template>