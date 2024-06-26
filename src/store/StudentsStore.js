import {create} from "zustand";
import {goToLoginPage} from "../util/Tool.js";
import axios from "../axios/index.js";


const useStudentsStore = create((set, get) => ({
    students: [],
    copyStudents: [],
    student: null,
    tenStudentsFirsts: new Set(),
    studentSelected: null,
    setStudentSelected: (student) => {
        set({studentSelected: student});
    },
    setStudents: (students) => {
        set({students});
    },
    getStudents: async () => {
        try {
            const response = await axios.get('students/get/status/active');
            set({students: response.data.data});
            // const tenStudentsFirsts = new Set(response.data.data.slice(0, 10));
            // set({tenStudentsFirsts});
        } catch (error) {
            console.log(error);
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    },
    getStudent: async (id) => {
        try {
            const response = await axios.get(`students/get/${id}`);
            const dataResponse = response.data.data;
            set({student: dataResponse});
        } catch (error) {
            console.log(error);
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    },
    searchStudent: async (keyword) => {
        try {
            const response = await axios.get(`students/get/name/${keyword}`);
            set({students: response.data.data});
        } catch (error) {
            console.log(error);
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    },
    getStudentsByClass: async (keyword) => {
        try {
            const grade = keyword.split('-')[0];
            const major = keyword.split('-')[1];
            console.table({grade, major});
            const response = await axios.get(`students/get/class/${grade}/${major}`);
            set({students: response.data.data});
        } catch (error) {
            console.log(error);
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    }
}));

export default useStudentsStore;