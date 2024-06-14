import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { useFavorites } from '../pages/detail/context';

const AuthDetails = () => {
    const { favorites, removeFromFavorites } = useFavorites();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => console.log('Success'))
            .catch((e) => console.log(e));
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex w-full h-auto items-center justify-center">
                <div className="flex w-10/12 h-auto items-center justify-center flex-col pt-36">
                    <div className="flex items-center">
                        <img
                            className="w-36 h-36"
                            src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                            alt="ava"
                        />
                    </div>
                    <div className="flex items-center flex-col pt-8">
                        {authUser ? (
                            <div>
                                <h1 className="text-2xl text-white">
                                    {`Вы на аккаунте ${authUser.email}`}
                                </h1>
                                <div className="flex w-full items-center justify-center pt-6 pb-2">
                                    <button
                                        onClick={userSignOut}
                                        className="border-2 p-2 duration-500 hover:border-red-500 bg-white"
                                    >
                                        Выйти из аккаунта
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to={'/sign-up'}>
                                <h1 className="p-2 text-lg text-white">
                                    Еще нет аккаунта?{' '}
                                    <span className="text-blue-500">Зарегистрируйтесь</span>
                                </h1>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-around w-full h-full pt-16">
                <div className='flex flex-col w-4/12 items-center max-h-96 overflow-auto'>
                    <h2 className="text-2xl text-white">Избранное:</h2>
                    <ul className="text-white pt-6">
                        {favorites.length > 0 ? (
                            favorites.map((item) => (
                                <div key={item.id} className='flex items-center gap-4 pt-8'>
                                    <p className='text-2xl'>{item.title}</p>
                                    <img
                                        className='w-5 h-5 cursor-pointer'
                                        onClick={() => removeFromFavorites(item.id)}
                                        src='https://cdn-icons-png.flaticon.com/128/1828/1828843.png'
                                    >
                                    </img>
                                </div>
                            ))
                        ) : (
                            <li>Нет избранных элементов</li>
                        )}
                    </ul>
                </div>
                <div className='flex flex-col w-4/12 justify-center items-center'>
                    <h2 className="text-2xl text-white">График сеансов</h2>
                    <div className='gap-y-4 items-start flex h-auto flex-col pt-6'>
                        <p className='text-white text-xl'>Головоломка, 15-18 июня</p>
                        <p className='text-white text-xl'>Плохие парни - до конца, 16 июня</p>
                        <p className='text-white text-xl'>Рай под ногами матерей, 16-17 июня</p>
                        <p className='text-white text-xl'>Планета обезьян, 15-16 июня</p>
                        <p className='text-white text-xl'>Гарфилд в кино, 15-16 июня</p>
                    </div> 
                </div>
                <div className='flex flex-col w-4/12 items-center'>
                    <h2 className="text-2xl text-white">Запланированные:</h2>
                    <ul className="text-white pt-6">
                        <li>Тут пока пусто</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AuthDetails;
