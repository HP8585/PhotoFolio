<template>
    

<div class="mx-auto w-fit max-w-[70em] flex gap-10 items-center py-12 relative animate-pulse ">
    <div class="flex gap-10 ">
        <img class="w-[10em] max-h-[10em] rounded-full" src="../assets/user.jpg">
    
    <!--information-->
    <div class="flex flex-col text-gray-400 ">
 
        <!--username and info-->
        <div class="flex gap-20 justify-between items-center text-gray-500">
            <!-- <h1 class="text-3xl font-bold text-black mr-20">{{ item?.name }}</h1> -->
            <h1 class="text-3xl rounded-sm w-[4em] h-5 bg-gray-300 font-bold text-black mr-20"/>
            <div class="flex gap-3 items-center text-xl">
                <i class="fa-solid fa-envelope border rounded px-2 py-1 hover:text-black hover:border-black duration-300 cursor-pointer" />
                <i  class="fa-solid fa-ellipsis border rounded px-2 py-1 hover:text-black hover:border-black duration-300 cursor-pointer" />
            </div>
          
        </div>
        <div class=" mt-2 flex gap-10 items-center justify-cente text-xl">
            <div class="flex flex-col items-center cursor-pointer">
                <div  class="flex items-center gap-1">
                    <i class="fa-solid fa-users" />
                <span class="text-lg "></span>
                </div>
                
                <span class="text-sm">Followers</span>
            </div>

            <div  class="flex flex-col items-center cursor-pointer">
                <div class="flex items-center gap-1">
                    <i class="fa-solid fa-user" />
                <span class="text-lg "></span>
                </div>
                <!-- <i class="fa-solid fa-user" /> -->
                <!-- <span class="text-lg ">{{ item?.following_count }}</span> -->
                <span class="text-sm ">Following</span>
            </div>
        </div>
    
        <!--Biography-->
        <h1 class="text-[1.1rem] bg-gray-300 rounded-sm my-3 w-[6em] h-3 pt-3 font-bold text-black mr20"></h1>
        <div class="pb-3 pt-1.5">
            <p class="text-black w-[20em] h-10 rounded-sm bg-gray-300"></p>
        </div>
        <div >
            
            <ul class="flex  flex-col gap-1">
                <li class="flex items-center gap-2 " >
                    <i class="fa fa-circle-check" />
                    <span class="w-[7em] h-3 rounded-sm bg-gray-300"></span>
                </li>
                <li class="flex items-center gap-2 capitalize" >
                    <i class="fa fa-location-dot" />
                    <span class="w-[6em] h-3 rounded-sm bg-gray-300"></span>
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
</template>