import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [copyPassword, setCopyPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handlePassword = () => setShowPass(!showPass);

    const register = (e) => {
        e.preventDefault();
        if (password !== copyPassword) {
            setError("Password mismatch");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setError('');
                setEmail('');
                setPassword('');
                setCopyPassword('');
                localStorage.setItem('KINOauth', true);
                navigate('/personal-area');
            })
            .catch((error) => setError(error.message));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-4">
                    <Link to="/sign-in" className="mr-4 text-black">Вход</Link>
                    <span className="font-bold text-black">Регистрация</span>
                </div>
                <form onSubmit={register} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            placeholder='Введите ваш e-mail'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                placeholder='Придумайте пароль'
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handlePassword}>
                                <img src={showPass ? 'https://cdn-icons-png.flaticon.com/128/709/709612.png' : 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png'} alt="eye" className="h-5 w-5" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="copyPassword" className="block text-sm font-medium text-gray-700">Повторите пароль</label>
                        <div className="relative">
                            <input
                                id="copyPassword"
                                type={showPass ? 'text' : 'password'}
                                value={copyPassword}
                                onChange={(e) => setCopyPassword(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                placeholder='Повторите пароль'
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handlePassword}>
                                <img src={showPass ? 'https://cdn-icons-png.flaticon.com/128/709/709612.png' : 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png'} alt="eye" className="h-5 w-5" />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input id="remember" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Запомнить меня</label>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">Зарегистрироваться</button>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
