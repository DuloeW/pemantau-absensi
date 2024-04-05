import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import useAnonymousStore from "../store/AnonymousStore.js";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'

const AlertValidation = ({onClick, student}) => {
    const navigate = useNavigate()
    const [dateBorn, setDateBorn] = useState({date: ''})
    const [loading, setLoding]  = useState(false)
    const {setLoadingIsVisible} = useAnonymousStore()
    const check = () => {
        if(checkingBirthdate()) {
            setLoding(true);
            setLoadingIsVisible(true);
            setTimeout(() => {
                setLoding(false);
                setLoadingIsVisible(false);
                close();
                navigate(`/detail/${student.id}`)
            }, 2000)
        } else {
            setLoding(true);
            setLoadingIsVisible(true);
            setTimeout(() => {
                setLoding(false);
                setLoadingIsVisible(false);
                close()
            }, 2000)
        }
    }

    const close = () => {
        onClick(false);
    }

    const handleInputBirthDate = (e) => {
        setDateBorn({date: e.target.value})
    }

    const checkingBirthdate = () => {
        const inputDate = dateBorn.date
        const studentDate = student?.dateOfBirth
        if (inputDate === studentDate) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Pantauan berhasil dilakukan',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            })
            return true
        } else {
            setDateBorn({date: ''})
            Swal.fire({
                title: 'Gagal!',
                text: 'Tanggal lahir tidak sesuai dengan data siswa',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            })
            return false
        }
    }

    return (
        <div className='p-5 w-full h-full relative'>
            <div className='pb-1 border-b-2'>
                <p className='text-2xl font-semibold'>Nama</p>
                <p className='font-semibold mt-2'>{student.name}</p>
            </div>
            <div className='flex flex-col pb-1 border-b-2'>
                <label className='text-2xl font-semibold mt-5'
                       htmlFor='birthdate'>
                    Tanggal Lahir
                </label>
                <input className='bg-transparent mt-2 p-3 pl-0 w-full outline-none border-none'
                       type='date'
                       id='birthdate'
                       name='birthDate'
                       value={dateBorn.date}
                       onChange={(e) => handleInputBirthDate(e)}
                       required={true}
                />
            </div>
            <div className='flex gap-5'>
                <button className='bg-teal-800 text-white px-8 py-2 mt-5 rounded-md'
                        disabled={dateBorn.date === '' ? true : false}
                        onClick={() => check()}>
                    Cek
                </button>
                <button className='bg-red-800 text-white px-8 py-2 mt-5 rounded-md'
                        onClick={() => close()}>
                    Batal
                </button>
            </div>
        </div>
    )
}

export default AlertValidation;