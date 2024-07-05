import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handlePassword = () => setShowPass(!showPass);

    const LogIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                localStorage.setItem('KINOauth', true);
                setError('');
                setEmail('');
                setPassword('');
                navigate('/personal-area');
            })
            .catch((error) => {
                setError('Мы не смогли найти ваш аккаунт');
                console.error(error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-4">
                    <span className="font-bold text-black">Вход</span>
                    <Link to="/sign-up" className="ml-4 text-black">Регистрация</Link>
                </div>
                <form onSubmit={LogIn} className="space-y-6">
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
                                placeholder='Введите ваш пароль'
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
                    <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">Войти</button>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
