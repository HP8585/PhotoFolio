import axios from 'axios'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
export const fetchApi = ()=>{
    const userStore = useUserStore()
    const { availableItems } = storeToRefs(userStore)

    const apiKey = ref('79fLKh2mPCwgUk08JdStYN7EY6r8ASsW5gzjNJuJ6SI')
    
    const retryCount = ref(0)
    const fetchRandomHome = async ()=>{
        try{
            // retryCount.value = 0
            const res = await axios.get(`https://api.unsplash.com/photos/random?count=20&client_id=${apiKey.value}`)
            if(res){
                
                availableItems.value = res.data
                userStore.homeLoading = false
            }
        } catch(error){
            if(error.response && error.response?.status === 403 && retryCount.value < 1){
                apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
                retryCount.value ++;
                
                setTimeout(() => {
                    fetchRandomHome() 
                }, 2000);
                
                
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retryCount.value < 2){
                apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
                retryCount.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchRandomHome())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retryCount.value < 3){
                apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then( fetchRandomHome())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retryCount.value < 4){
                apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then( fetchRandomHome())
            }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retryCount.value < 5){
                apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then( fetchRandomHome())
            } else{
                // alert('sorry but we failed fetching data from the server, please try again later!')
            }
        }
      
       
    }


    const searchedItem = ref(null)
    const searchItem = async (query)=>{
        try{
            retryCount.value = 0
            const res = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${apiKey.value}`)
            if(res){
                searchedItem.value = res.data
                availableItems.value = res.data.results
                userStore.isSearchLoading = false
                userStore.homeLoading = false
            }
        }catch(error){
            if(error.response && error.response?.status === 403 && retryCount.value < 1){
                apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(searchItem())
                
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retryCount.value < 2){
                apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
                retryCount.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(searchItem())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retryCount.value < 3){
                apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(searchItem())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retryCount.value < 4){
                apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(searchItem())
            }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retryCount.value < 5){
                apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
                retryCount.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(searchItem())
            } else{
                alert('sorry but we failed fetching data from the server, please try again later!')
            }
        }
    }

    const retryFetchMore = ref(0)
    const fetchMore = async ()=>{
        try{
            
            const response = await axios.get(`https://api.unsplash.com/photos/random?count=20&client_id=${apiKey.value}`)
            if(response){
            
                userStore.availableItems.push(...response.data)
                userStore.bottomLoading = false
            }
        } catch(error){
            if(error.response && error.response?.status === 403 && retryFetchMore.value < 1){
                apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMore())
                
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retryFetchMore.value < 2){
                apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
                retryFetchMore.value++;
                 await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMore())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retryFetchMore.value < 3){
                apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMore())
            }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retryFetchMore.value < 4){
                apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMore())
            }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retryFetchMore.value < 5){
                apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
                retryFetchMore.value++;
                await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMore())
            } else{
                // alert('sorry but we failed fetching data from the server, please try again later!')
            }
        }
    }


    const retrySearched = ref(0)
    const fetchMoreOfSearched = async(query, page)=>{
      try{
       
        const res = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${page}&client_id=${apiKey.value}`)

        if(res){
            userStore.availableItems.push(...res.data.results)
            userStore.bottomLoading = false
        }
      } catch(error){
       
        if(error.response && error.response?.status === 403 && retrySearched.value < 1){
            apiKey.value = 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o'
            retrySearched.value++;
            await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMoreOfSearched())
            
        }else if(error.response && error.response?.status === 403 && apiKey.value === 'SrCL97aKClRsk6t6g_zkDxSKLlnzwJl0QlYW9h7sa_o' && retrySearched.value < 2){
            apiKey.value = 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM'
            retrySearched.value++;
             await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMoreOfSearched())
        }else if(error.response && error.response?.status === 403 && apiKey.value === 'G-uV2qj3Izf203ipuxsgjTeRikb-ikuESf_l6vQ8qWM' && retrySearched.value < 3){
            apiKey.value = 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E'
            retrySearched.value++;
            await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMoreOfSearched())
        }else if(error.response && error.response?.status === 403 && apiKey.value === 'iNj6vcXxPKoYXqIBAsLyOH9eqF3WHSjponXDe1NJQ0E' && retrySearched.value < 4){
            apiKey.value = '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg'
            retrySearched.value++;
            await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMoreOfSearched())
        }else if(error.response && error.response?.status === 403 && apiKey.value === '_jOmkfWQRcI63HY39NqEKgEF0w1ubMSD5NpR0Z5MEUg' && retrySearched.value < 5){
            apiKey.value = 'stHOSrbl_G7Qh-W6gg9QsucMRv7Ahkz6_LIpxyB_lG8'
            retrySearched.value++;
            await new Promise(resolve => setTimeout(() => resolve , 1000)).then(fetchMoreOfSearched())
        } else{
            // alert('sorry but we failed fetching data from the server, please try again later!')
        }
      }
    }
    return{
        fetchRandomHome,
        searchItem,
        searchedItem,
        fetchMore,
        fetchMoreOfSearched
    }
}