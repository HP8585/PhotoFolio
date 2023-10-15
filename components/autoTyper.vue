<template>
<div  class="text-white absolute whitespace-nowrap top-0 translate-y-[-50%]">
  <span class="text-white">{{ currentWord }}</span>
</div>
</template>

<script setup>


const words = ref(['Innovation', 'Adventure', 'a challenge', 'nature', 'beauty'])
const wordIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const currentWord = ref('')
let intervalId = null

const typeEffect = () => {
  const currentWordIndex = wordIndex.value
  const currentWordToType = words.value[currentWordIndex]
  const currentWordLength = currentWordToType.length

  if (isDeleting.value) {
    
        currentWord.value = currentWordToType.substring(0, charIndex.value - 1)
    charIndex.value--
  
    
  } else {
    currentWord.value = currentWordToType.substring(0, charIndex.value + 1)
    charIndex.value++
  }

  if (charIndex.value === currentWordLength + 1) {
    isDeleting.value = true
    clearInterval(intervalId)
    intervalId = setTimeout(typeEffect, 6000)
  } else if (charIndex.value === -1) {
    isDeleting.value = false
    wordIndex.value = (currentWordIndex + 1) % words.value.length
    clearInterval(intervalId)
    intervalId = setTimeout(typeEffect, 6000)
  }

  if (!isDeleting.value) {
    intervalId = setTimeout(typeEffect, 6000)
  }
}

onMounted(() => {
  intervalId = setInterval(typeEffect, 400)
})


// const words = ref(["PhotoFolio: Where the art of photography meets the power of storytelling. Immerse yourself in a captivating visual journey as you explore our curated collection of stunning images. From breathtaking landscapes to intimate portraits, PhotoFolio is your gateway to a world of creativity and inspiration. Discover the beauty of moments frozen in time, each photograph telling a unique story. Whether you're a professional photographer or an avid enthusiast, our platform provides a space to showcase your talent, connect with fellow artists, and share your passion with the world. Join us on PhotoFolio and let your images speak volumes."])
// const wordIndex = ref(0)
// const charIndex = ref(0)
// const isDeleting = ref(false)
// const currentWord = ref('')
// let intervalId = null

// const typeEffect = () => {
//   const currentWordIndex = wordIndex.value
//   const currentWordToType = words.value[currentWordIndex]
//   const currentWordLength = currentWordToType.length

//   if (isDeleting.value) {
//     currentWord.value = currentWordToType.substring(0, charIndex.value - 1)
//     charIndex.value--
//   } else {
//     currentWord.value = currentWordToType.substring(0, charIndex.value + 1)
//     charIndex.value++
//   }

//   if (charIndex.value === currentWordLength + 1) {
//     isDeleting.value = true
//     clearInterval(intervalId)
//     intervalId = setInterval(typeEffect, 2000)
//   } else if (charIndex.value === -1) {
//     isDeleting.value = false
//     wordIndex.value = (currentWordIndex + 1) % words.value.length
//     clearInterval(intervalId)
//     intervalId = setInterval(typeEffect, 2000)
//   }

//   if (!isDeleting.value && charIndex.value !== currentWordLength + 1) {
//     intervalId = setInterval(typeEffect, 700)
//   }
// }

// onMounted(() => {
//   intervalId = setInterval(typeEffect, 2000)
// })













// const words = ref(['hi', 'bye', 'fuck'])

// const wordIndex = ref(0)
// const charIndex = ref(0)
// const isDeleting = ref(false)
// const currentChar = ref(null)
// const typeEffect = ()=>{
//     var currentWord = words.value[wordIndex.value]
//     currentChar.value = currentWord[charIndex.value]

//     if(!isDeleting.value && charIndex.value < currentWord.length){
//         charIndex.value++;
//         setInterval(() => {
//             typeEffect()
//         }, 200);
//     }else if(isDeleting.value && charIndex.value > 0){
//         charIndex.value --;
//         setInterval(() => {
//             charIndex.value--
//         }, 100);
//     }else{
//         isDeleting.value = !isDeleting.value
//         wordIndex.value = !isDeleting.value ? (wordIndex.value + 1) % words.value.length : wordIndex.value;
//     }
// }

// onMounted(()=>{
//     typeEffect()
// })
</script>