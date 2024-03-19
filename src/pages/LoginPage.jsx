import blobIcon from '../assets/blob.svg';
import blobIcon2 from '../assets/blob2.svg';
import smkIcon from '../assets/smk.svg';
import wave from '../assets/wave.svg';
import personIcon from '../assets/Programming-cuate.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faEye, faEyeSlash, faLock, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "../axios/index.js";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const switchShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    const loadingActive = () => {
        setLoading(true);
    }

    const loadingNonActive = () => {
        setLoading(false);
    }

    const handleGetInput = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const goToNextPage = () => {
        navigate('/')
    }

    const login = async () => {
        try {
            loadingActive()
            const response = await axios.post('user/login', form)
            Cookies.set('token-pantau', response.data.token, {expires: 1})
            goToNextPage()
        } catch (err) {
            loadingNonActive()
            console.log(err)
        } finally {
            loadingNonActive()
        }
    }
    return (
        <div className='relative w-full h-screen p-8 overflow-hidden'>
            <img className='w-[290px] mt-2 drop-shadow-lg shadow-teal-950'
                src={personIcon}
                alt="blob" />
            <h1 className='text-xl font-bold mt-3'>
                <span className='text-4xl'>Halo </span>
                Orang Tua Siswa, Silahkan Login Terlebih Dahulu Ya</h1>
            <div className='mt-8'>
                <div className='w-full relative'>
                    <FontAwesomeIcon icon={faEnvelope} className='absolute top-2/4 -translate-y-2/4 text-teal-950'/>
                    <input className='p-5 pl-8 w-full border-b-2 outline-none font-semibold placeholder:font-semibold'
                           type="email"
                           name="email"
                           value={form.email}
                           placeholder='Email Anda'
                           onChange={(e) => handleGetInput(e)}
                           required={true}
                    />
                </div>
                <div className='w-full relative mt-10'>
                    <FontAwesomeIcon icon={faLock} className='absolute top-2/4 -translate-y-2/4 text-teal-950'/>
                    <input className='p-5 pl-8 w-full border-b-2 outline-none font-semibold placeholder:font-semibold'
                           type={isShowPassword ? 'text' : 'password'}
                           name="password"
                           value={form.password}
                           placeholder='Password Anda'
                           onChange={(e) => handleGetInput(e)}
                           required={true}
                    />
                    <FontAwesomeIcon className='absolute top-2/4 -translate-y-2/4 right-5 text-teal-950'
                        icon={isShowPassword ? faEyeSlash : faEye}
                        onClick={() => switchShowPassword()}
                        />
                </div>
                <button className='w-full bg-teal-900 text-white font-bold p-5 mt-10 rounded-full'
                    onClick={() => login()}
                    disabled={loading}
                >
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <FontAwesomeIcon className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
                                icon={faRefresh}
                            />
                        </div>
                    ) : 'Masuk'}
                </button>
            </div>
        </div>
    )
};

export default LoginPage;