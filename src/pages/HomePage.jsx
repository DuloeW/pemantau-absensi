import axios from "../axios/index.js";
import useStudentsStore from "../store/StudentsStore.js";
import Cookies from "js-cookie";
import useAnonymousStore from "../store/AnonymousStore.js";
import {faArrowUp, faSearch} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BoxStudent from "../components/BoxStudent.jsx";
import {useEffect, useState} from "react";


const HomePage= () => {
    const [idActive, setIdActive] = useState({id: null})
    const [selectedStudent, setSelectedStudent] = useState(null)
    const {students,
        getStudents,
        setStudentSelected,
        setStudents,
        getStudentsByClass} = useStudentsStore()
    const {loadingIsVisible, querySearch} = useAnonymousStore()

    const handleStudentClicked = (value) => {
        if (selectedStudent !== null && selectedStudent.id === value.id) {
            setIdActive({id: null});
            setSelectedStudent(null);
        } else {
            setIdActive({id: value.id});
            setSelectedStudent(value)
            setStudentSelected(value);
        }
    }

    const handleSearch = (e) => {
        let keyword = e.target.value
        console.log(querySearch)
        if (keyword === '') {
            console.log(querySearch)
            if(querySearch !== '') {
                getStudentsByClass(querySearch)
            } else {
                getStudents()
            }
        } else {
            searchStudent(e.target.value)
        }
    }

    const searchStudent = (keyword) => {
        const newStudent = students.filter(student => {
            return student.name.toLowerCase().includes(keyword.toLowerCase())
        })
        setStudents(newStudent)
    }

    useEffect(() => {
        setIdActive(prevState => ({...prevState, id: null}))
    }, [loadingIsVisible]);

    return (
        <div className={`w-full relative bg-white
             ${students.length === 0 ? 'h-fit' : 'h-full'}
        `}>
            <SideBar/>

            <div id='home' className='w-full flex flex-col justify-center items-center pt-32'>
                <h1 className='text-4xl font-extrabold'>Pantau Anak Anda</h1>
                <p className='text-lg font-bold tracking-widest'>di sini</p>
                <div className='mt-10 relative w-3/4 grid place-items-center'>
                    <FontAwesomeIcon icon={faSearch} className='text-lg text-neutral-300 absolute top-11/12 left-6 -translate-y-11/12'/>
                    <input className='w-full p-3 pl-14 text-neutral-600 font-semibold rounded-xl outline-none border-none bg-white shadow-md'
                           style={style.customShadow}
                           onChange={(e) => handleSearch(e)}
                        type="search" />
                </div>
                <div className='mt-10 pb-5 w-full h-fit flex flex-col items-center gap-20 overflow-y-auto md:flex-row md:flex-wrap md:justify-evenly'>
                    {students?.map((student) => (
                            <div key={student.id} className={`
                                ${selectedStudent !== null && student.id !== idActive.id ? 'pointer-events-none' : 'pointer-events-auto '}
                            `}>
                                <BoxStudent style={style.customShadow} onClick={handleStudentClicked}
                                    student={student}/>
                            </div>
                        ))}
                    {students.length === 0 && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p className='text-2xl font-semibold text-neutral-300'>Siswa Tidak Ada!!</p>
                        </div>
                    )}
                </div>
            </div>

            <a href="#home">
                <div className='fixed right-5 bottom-5 w-14 h-14 grid place-items-center bg-white shadow-2xl rounded-xl z-50'>
                    <FontAwesomeIcon icon={faArrowUp} className='text-4xl text-neutral-700'/>
                </div>
            </a>

        </div>
    )
}

const style = {
    customShadow: {
        boxShadow: '0 0 20px #eee'
    }
}

export default HomePage;