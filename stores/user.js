import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
    isWindowShown: -2,
    shown: false,
    availableItems:'',
    onPage: 'photos',
    isSearchLoading: false,
    favItems: [],
    clearAll : false,
    clearSome: false,
    searchTerm : '',
    bottomLoading: false,
    homeLoading: false,
    notifFav: false,
    width: 100,
    contact: false
    })
})