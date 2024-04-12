import {create} from "zustand";
import axios from "../axios/index.js";
import {goToLoginPage} from "../util/Tool.js";

const useClassStore = create((set) => ({
    classes: [],
    getClasses: async () => {
        try {
            const response = await axios('class/get-all');
            const classes = await response.data.data;
            set({ classes });
        } catch (error) {
            console.log(error);
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    }
}));

export default useClassStore;