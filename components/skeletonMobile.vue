<template>
<div class="md:hidden bloc animate-pulse">
    <div class="flex justify-between px-4 py-12">
    <div>
        <img class="w-[7em] h-[7em]  rounded-full" src="../assets/user.jpg">
    </div>
    <div class="text-gray-400 mt-2 flex gap-10 items-center justify-cente text-xl">
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
    <i  class="fa-solid fa-ellipsis text-xl border rounded px-2 py-1 h-fit duration-300 cursor-pointer" />
</div>
<div class="px-5 flex flex-col gap-1">
    <div class="flex flex-col">
<div class="font-extrabold text-lg w-[5em] rounded-sm h-3.5 bg-gray-300"/>
  
<small class="w-[4em] rounded-sm h-2 bg-gray-300 mt-2"></small>
</div>
<p class="mb5 h-10 rounded-sm w-[14em] bg-gray-300"></p>

<span class="text-gray-400 text-sm mb-2 flex items-center gap-1"><i class="fa-solid fa-link" /> <div class="w-[4em] h-2 rounded-sm bg-gray-300"/> </span>
</div>

</div>
</template>