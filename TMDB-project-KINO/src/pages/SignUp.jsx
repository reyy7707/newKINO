//Компоненты

//Стили

//Библиотеки
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';

const SignUp = () => {
    document.cookie = 'cookieName=cookieValue; SameSite=None; Secure';
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [copyPassword, setCopyPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false)
    const [eye, setEye] = useState('invalid')
    const isMobile = useMediaQuery('(max-width: 729px)')
    const [errorinfo, setErrorinfo] = useState()

    const handlePassword = () => {
        setShowPass(!showPass);
        setEye('invalid')
    };
    const secondHandlePassword = () => {
        setShowPass(!showPass);
        setEye('valid')
    }

    const navigate = useNavigate()

    function register(e) {
        e.preventDefault()
        if (password !== copyPassword) {
            setError("Password mismatch")
            return
        }
        createUserWithEmailAndPassword(auth, email, password, displayName).then(() => {
            setDisplayName('')
            setError('')
            setEmail('');
            setPassword('');
            setCopyPassword('');
            localStorage.setItem('KINOauth', true)
            navigate('/personal-area')
        })
            .catch((error) => setErrorinfo(error.message))
    }
    useEffect(() => {
        console.log(errorinfo);
        if (errorinfo === 'Firebase: Error (auth/invalid-email).') {
            console.log('Invalid email');
        } else {
            console.log('succes');
        }
    }, [register])

    return (
        <>
            <div className='w-full h-auto items-center justify-center flex bg-white'>
                <div className={` ${isMobile ? "w-5/6" : "w-2/6"}   h-auto flex flex-col mt-32 shadow-2xl border`}>
                    <form
                        onSubmit={register}
                        className='flex flex-col items-center relative'>
                        <div className='flex items-start flex-col'>
                            <h1 className={` ${isMobile ? "text-2xl" : "text-4xl"}  text-clip pt-8 textblack opacity-90 text-black`}> Регистрация аккаунта </h1>
                        </div>
                        <h1 className={` ${isMobile ? "" : "relative right-32"} pt-8 text-black`}> Введите свою почту* </h1>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Введите почту'
                            type='email'
                            className={` ${isMobile ? "w-5/6" : "w-4/6"} border shadow bg-white rounded-md p-3  text-xl pl-8 mt-2`} />
                        <h1 className={` ${isMobile ? "" : "relative right-32"} pt-8 text-black`}> Придумайте пароль* </h1>
                        <div className='flex relative w-full items-center justify-center'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Введите пароль'
                                type={showPass ? 'text' : 'password'}
                                className={` ${isMobile ? "w-5/6" : "w-4/6"} border shadow bg-white rounded-md p-3  text-xl pl-8 mt-2`} />
                            <div className='flex'>
                                {eye === 'invalid' && <img className={` ${isMobile ? "absolute right-12" : "absolute right-32"} w-6 h-6 cursor-pointer bottom-3`} onClick={secondHandlePassword} alt='eyeHidden' src='https://cdn-icons-png.flaticon.com/128/2767/2767146.png' />}
                                {eye === 'valid' && <img className={` ${isMobile ? "absolute right-12" : "absolute right-32"} w-6 h-6 cursor-pointer bottom-3`} onClick={handlePassword} alt='eyeValid' src='https://cdn-icons-png.flaticon.com/128/709/709612.png' />}
                            </div>
                        </div>

                        <h1 className={` ${isMobile ? "" : "relative right-32"} pt-8 text-black`}> Повторите пароль* </h1>
                        <div className='flex relative w-full items-center justify-center'>
                            <input
                                value={copyPassword}
                                onChange={(e) => setCopyPassword(e.target.value)}
                                placeholder='Введите пароль повторно'
                                type={showPass ? 'text' : 'password'}
                                className={` ${isMobile ? "w-5/6" : "w-4/6"} border shadow bg-white rounded-md p-3  text-xl pl-8 mt-2`} />
                            <div className='flex'>
                                {eye === 'invalid' && <img className={` ${isMobile ? "absolute right-12" : "absolute right-32"} w-6 h-6 cursor-pointer bottom-3`} onClick={secondHandlePassword} alt='eyeHidden' src='https://cdn-icons-png.flaticon.com/128/2767/2767146.png' />}
                                {eye === 'valid' && <img className={` ${isMobile ? "absolute right-12" : "absolute right-32"} w-6 h-6 cursor-pointer bottom-3`} onClick={handlePassword} alt='eyeValid' src='https://cdn-icons-png.flaticon.com/128/709/709612.png' />}
                            </div>
                        </div>
                        <div className={` ${isMobile ? "" : "relative right-32"} flex items-center pt-4`}>
                            <input type='checkbox' className='w-5 h-5' /> <h1 className='pl-2 text-black'> Запомнить меня </h1>
                            
                        </div>
                        <div className='flex w-full'>
                            <Link className={` ${isMobile ? "pl-20" : "pl-28"} flex  pt-4 items-center text-blue-500`} to={'/sign-in'}> <h1> Уже есть аккаунт? </h1> <span className='text-blue-500 pl-1'> Войти </span> </Link>
                        </div>
                        <button
                            className='bg-blue-500 rounded-md mt-8 p-4 w-4/6 text-white text-xl'> Зарегистрироваться </button>
                        {error ? <p className='text-red-500'> {error} </p> : ''}
                        <div className='flex pb-12'></div>
                    </form>
                </div>
            </div>
            <div className='w-full h-full bg-white pb-36'></div>
        </>
    )
}

export default SignUp
