import {create} from "zustand";

const useAnonymousStore = create((set) => ({
    loadingIsVisible: false,
    querySearch: '',
    setLoadingIsVisible: (isVisible) => {
        set({loadingIsVisible: isVisible});
    },
    setQuerySearch: (query) => {
        set({querySearch: query});
    }
}))

export default useAnonymousStore;