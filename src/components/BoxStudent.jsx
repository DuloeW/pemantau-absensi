import {useState} from "react";
import AlertValidation from "./AlertValidation.jsx";

const BoxStudent = ({ student, style, onClick }) => {
    const [showValidation, setShowValidation] = useState(false)

    const sendStudent = () => {
        onClick(student)
    }
    const openValidation = () => {
        sendStudent()
        setShowValidation(true)
    }

    const handleClose = (value) => {
        sendStudent()
        setShowValidation(value)
    }
    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }

    return (
        <div className='relative w-80 bg-white shadow-md rounded-xl overflow-hidden'
             style={style}>
            <div className={`absolute z-50 bottom-0 right-0 w-full h-full bg-white rounded-xl transition-all duration-300
                ${showValidation ? 'translate-y-0' : 'translate-y-96'}
            `}>
                <AlertValidation onClick={handleClose} student={student}/>
            </div>
            <div className='h-60 grid place-items-center z-10 border-b-2 border-neutral-100'>
                <div style={styleCss.image(student.image.file)}></div>
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <div className='text-teal-900'>
                    <p className='text-xl font-bold'>{student.name}</p>
                    <p className='font-bold text-xs'>{removeSymbol(student?.classGrade?.major)}</p>
                </div>

                <button className='px-5 py-2 rounded-md bg-teal-900 text-white font-semibold tracking-widest'
                    onClick={() => openValidation()}
                >
                    Pantau
                </button>
            </div>
        </div>
    );
}

const styleCss = {
    image: (url) => {
        return {
            backgroundImage: `url(data:image/png;base64,${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '60%',
            height: '100%',
            rotate: '-90deg',
            borderRadius: '2% 50% 50% 2%',
        }
    },
}

export default BoxStudent;