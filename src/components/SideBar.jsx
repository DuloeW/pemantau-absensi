import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import useClassStore from "../store/ClassStore.js";
import useAnonymousStore from "../store/AnonymousStore.js";
import useStudentsStore from "../store/StudentsStore.js";

const listGrade = ['X', 'XI', 'XII']
const SideBar = () => {
    const [activeSideBar, setActiveSideBar] = useState(false)
    const [query, setQuery] = useState({grade: '', major: ''})
    const [major, setMajor] = useState(new Set())
    const [isFiltered, setIsFiltered] = useState(false)
    const {classes, getClasses} = useClassStore()
    const {getStudents, getStudentsByClass} = useStudentsStore()
    const {setQuerySearch} = useAnonymousStore()

    const handleClick = () => {
        setActiveSideBar(false)
        submit()
    }

    const switchOpenSideBar = () => {
        setActiveSideBar(!activeSideBar)
    }

    const removeSymbol = (string) => {
        return string.replace(/_/g, ' ')
    }

    const handleChangeSelect = (e) => {
        setQuery(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submit = () => {
        // setQuerySearch(query.grade.concat('-').concat(query.major))
        setIsFiltered(true)
        const querySearch = query.grade.concat('-').concat(query.major)
        setQuerySearch(querySearch)
        getStudentsByClass(querySearch)
    }

    const backToDefault = () => {
        getStudents()
        setQuerySearch('')
        setIsFiltered(false)
    }

    useEffect(() => {
        getClasses()
    }, []);


    useEffect(() => {
        const grades = ['X', 'XI', 'XII']
        const formatedData = new Set()

        grades.forEach(grade => {
            const filteredByGrade = classes.filter(item => item.grade === grade)
            filteredByGrade.forEach(item => {
                formatedData.add(removeSymbol(item.major))
            })
        })
        setMajor(formatedData);
    }, [classes])

    return (
        <div className={`fixed z-[100] w-full left-2/4 -translate-x-2/4 transition-all duration-300
            ${activeSideBar ? 'translate-y-0' : '-translate-y-full'}
        `}>
            <div className='relative w-full h-full max-h-screen bg-white p-5 flex flex-col gap-8'
                 style={styles.sidebar}>

                <div className='absolute -bottom-20 w-16 h-16 bg-white shadow-xl rounded-md flex justify-center items-center cursor-pointer'
                     onClick={switchOpenSideBar}>
                    <FontAwesomeIcon icon={activeSideBar ? faXmark : faBarsStaggered} />
                </div>

                <div className='mt-5 pb-8 border-b-2'>
                    <h1 className='text-center text-3xl font-extrabold text-teal-900'>Filter Pencarian</h1>
                </div>
                <div className='border-b-2 pb-5'>
                    <h3 className='text-lg font-bold'>Kelas</h3>
                    <div>
                        <select className='w-full p-2 rounded-md outline-none border-none'
                                name="grade"
                                id=""
                                onChange={(e) => handleChangeSelect(e)}
                        >
                            <option disabled={true} selected={isFiltered === false}>Pilih Kelas</option>
                            {listGrade.map((grade, index) => (
                                <option className=''
                                        key={index}
                                        value={grade}
                                >
                                    {grade}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='border-b-2 pb-5'>
                    <h3 className='text-lg font-bold'>Jurusan</h3>
                    <div>
                        <select className='w-full p-2 rounded-md outline-none border-none'
                                name="major"
                                id=""
                                onChange={(e) => handleChangeSelect(e)}
                        >
                            <option disabled={true} selected={isFiltered === false}>Pilih Jurusan</option>
                            {[...major].map((major, index) => (
                                <option className=''
                                        key={index}
                                        value={major}
                                >
                                    {major}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-full grid place-items-center'>
                    <button className='px-10 py-3 border-none outline-none bg-teal-900 text-white rounded-xl font-semibold'
                            type={"button"}
                            onClick={() => handleClick()}
                    >
                        Terapkan
                    </button>
                    <button className='text-xs mt-2 border-b-2 text-neutral-400'
                        onClick={() => backToDefault()}
                    >
                        Setelan Awal
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        boxShadow: '-10px 0px 20px #00000033',
    }
}

export default SideBar;