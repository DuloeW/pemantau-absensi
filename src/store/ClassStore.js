import {create} from "zustand";
import axios from "../axios/index.js";

const useClassStore = create((set) => ({
    classes: [],
    getClasses: async () => {
        try {
            const response = await axios('class/get-all');
            const classes = await response.data.data;
            set({ classes });
        } catch (error) {
            console.log(error);
        }
    }
}));

export default useClassStore;