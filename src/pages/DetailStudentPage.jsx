import useStudentsStore from "../store/StudentsStore.js";
import {useEffect, useState} from "react";
import {faArrowLeft, faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";

const DetailStudentPage = () => {

    const location = useLocation()
    const [absensiStudent, setAbsensiStudent] = useState([])
    const [queryDate, setQueryDate] = useState({date: ''})
    const {student, getStudent} = useStudentsStore();

    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }

    const navigateBack = () => {
        window.history.back()
    }

    const handleSetDate = (e) => {
        const date = e.target.value
        setQueryDate(prev => (
            {...prev, date: date}
        ))
    }

    const resetDate = () => {
        setQueryDate({date: ''})
    }

    useEffect(() => {
        const id = location.pathname.split('/')[2]
        getStudent(id)
    }, [])

    useEffect(() => {
        setAbsensiStudent(student?.absensi)
    }, [student]);

    useEffect(() => {
        if(queryDate.date !== '') {
            const absensi = student?.absensi.filter(item => item.date === queryDate.date)
            setAbsensiStudent(absensi)
        } else {
            setAbsensiStudent(student?.absensi)
        }
    }, [queryDate.date]);

    return (
        <div className='w-full h-[calc(100vh)] relative bg-teal-700 overflow-y-auto'>
            <button className='absolute z-50 top-5 left-8 flex gap-2 py-1
             text-white font-bold border-b-2'
                onClick={() => navigateBack()}
            >
                <FontAwesomeIcon icon={faArrowLeft} className='mr-2'/>
                Kembali
            </button>

            <div className='w-full h-1/6 p-5'></div>

            <div className='w-full h-full relative z-50 pb-5 rounded-t-2xl bg-white flex flex-col items-center'>
                <div className='w-full p-8 h-fit relative'>
                    <div style={style.image(student?.image?.file)}
                         className='absolute -top-16 left-2/4 -translate-y-2/4 w-36 h-36 '></div>
                </div>
                <div className='w-full p-5 flex flex-col gap-2'>
                    <div>
                        <p className='font-semibold text-teal-900'>NISN</p>
                        <p className='font-semibold'>{student?.nisn}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-teal-900'>Nama</p>
                        <p className='font-semibold'>{student?.name}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-teal-900'>Kelas</p>
                        <p className='font-semibold'>{student?.classGrade?.grade}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-teal-900'>Jurusan</p>
                        <p className='font-semibold'>{removeSymbol(student?.classGrade?.major)}</p>
                    </div>
                </div>

                <div className='p-5 w-full h-fit'>
                    <h1 className='font-bold text-lg opacity-80'>Detail Absensi</h1>
                    <div className='flex gap-3 mb-3 relative'>
                        <FontAwesomeIcon icon={faCalendar} className='text-lg text-neutral-300 absolute left-2 top-2/4 -translate-y-2/4'/>
                        <input className='bg-white shadow-md p-2 pl-8 rounded-md outline-none border-none'
                            type="date"
                            value={queryDate.date}
                            onChange={(e) => handleSetDate(e)}
                        />
                        <button className='bg-red-900 text-white px-5 py-2 rounded-md font-semibold hover:'
                            onClick={() => resetDate()}
                        >ulangi</button>
                    </div>
                    <div className='overflow-y-auto w-full h-fit pb-5'>
                        <div className='w-full h-fit mt-3 flex flex-wrap gap-4'>
                            {absensiStudent?.map((absensi) => (
                                <div key={absensi.id}
                                     className='p-2 w-full h-fit font-semibold rounded-md bg-white shadow-md'>
                                    <div className='flex gap-5 text-sm'>
                                        <p>{absensi.date}</p>
                                        <p>{absensi.time}</p>
                                    </div>
                                    <p className='text-lg font-bold'>{absensi.status}</p>
                                </div>
                            ))}
                            {absensiStudent?.length === 0 && (
                                <div className='w-full h-full flex justify-center items-center'>
                                    <p className='text-2xl font-semibold text-neutral-300'>Absensi Tidak Ada!!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const style = {
    image: (url) => {
        return {
            backgroundImage: `url(data:image/png;base64,${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            rotate: '-90deg',
            borderRadius: '100%',
            border: '5px solid white'
        }
    },
}

export default DetailStudentPage;