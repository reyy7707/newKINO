import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import './AuthDetails.css';
import { useFavorites } from './detail/context';
// import { useNavigate } from 'react-router-dom';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const [editImg, setEditImg] = useState(false);
    const [showActiveProjects, setShowActiveProjects] = useState(true);
    const [img, setImg] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPanel, setAdminPanel] = useState(false);

    const [showActiveBackgrounds, setShowActiveBackgrounds] = useState(false);
    const [backgroundChange, setBackgroundChange] = useState(
        'https://cdn-icons-png.flaticon.com/128/149/149071.png'
    );

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user?.email === 'starshiiaman@gmail.com') {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        })
        return () => {
            listen();
        };
    }, [authUser])

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                console.log(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    useEffect(() => {
        const savedBackground = localStorage.getItem('backgroundChange');
        if (savedBackground) {
            setBackgroundChange(savedBackground);
        }
    }, []);

    const onHandleChangeProfileImg = () => {
        setEditImg(true);
        setShowActiveProjects(false);
    };
    const onHandleChangeProfileImgHidden = () => {
        setEditImg(false);
        setShowActiveProjects(true);
    };

    const onHandleFormData = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get('img'));
        setImg(formData.get('img'));
        console.log(img);
    };

    const toggleShowActiveBackgrounds = () => {
        setShowActiveBackgrounds(!showActiveBackgrounds);
    };

    const handleChangeBackground = (url) => {
        setBackgroundChange(url);
        localStorage.setItem('backgroundChange', url);
    };

    const HandleChange1 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/6998/6998058.png');
    };
    const HandleChange2 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/6997/6997660.png');
    };
    const HandleChange3 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/4128/4128176.png');
    };
    const HandleChange4 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/6997/6997589.png');
    };
    const HandleChange5 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/194/194938.png');
    };
    const HandleChange6 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/6998/6998126.png');
    };
    const HandleChange7 = () => {
        handleChangeBackground('https://cdn-icons-png.flaticon.com/128/10010/10010984.png');
    };

    return (
        <div className="dashboard min-h-screen">
            <div className="dashboard-content">
                <Sidebar
                    img={img}
                    backgroundChange={backgroundChange}
                    toggleShowActiveBackgrounds={toggleShowActiveBackgrounds}
                    showActiveBackgrounds={showActiveBackgrounds}
                    HandleChange1={HandleChange1}
                    HandleChange2={HandleChange2}
                    HandleChange3={HandleChange3}
                    HandleChange4={HandleChange4}
                    HandleChange5={HandleChange5}
                    HandleChange6={HandleChange6}
                    HandleChange7={HandleChange7}
                />
                <MainContent
                    authUser={authUser}
                    onHandleChangeProfileImg={onHandleChangeProfileImg}
                    onHandleChangeProfileImgHidden={onHandleChangeProfileImgHidden}
                    onHandleFormData={onHandleFormData}
                    editImg={editImg}
                    img={img}
                    isAdmin={isAdmin}
                    adminPanel={adminPanel}
                    setAdminPanel={setAdminPanel}
                />
            </div>
        </div>
    );
};

const Sidebar = ({
    img,
    backgroundChange,
    toggleShowActiveBackgrounds,
    showActiveBackgrounds,
    HandleChange1,
    HandleChange2,
    HandleChange3,
    HandleChange4,
    HandleChange5,
    HandleChange6,
    HandleChange7,
}) => {
    return (
        <aside className="sidebar relative top-24 items-center">
            <div className="avatar items-center justify-center">
                <img src={img || backgroundChange} alt="User Avatar" />
            </div>
            <h2>Имя Пользователя</h2>
            <p>Короткая информация о пользователе</p>
            <button onClick={toggleShowActiveBackgrounds} className="edit_btn w-11/12 h-[60px] text-lg">
                {showActiveBackgrounds ? 'Скрыть' : 'Редактировать'}
            </button>
            {showActiveBackgrounds && (
                <div className="backgrounds">
                    <img src="https://cdn-icons-png.flaticon.com/128/6998/6998058.png" alt="" onClick={HandleChange1} />
                    <img src="https://cdn-icons-png.flaticon.com/128/6997/6997660.png" alt="" onClick={HandleChange2} />
                    <img src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" alt="" onClick={HandleChange3} />
                    <img src="https://cdn-icons-png.flaticon.com/128/6997/6997589.png" alt="" onClick={HandleChange4} />
                    <img src="https://cdn-icons-png.flaticon.com/128/194/194938.png" alt="" onClick={HandleChange5} />
                    <img src="https://cdn-icons-png.flaticon.com/128/6998/6998126.png" alt="" onClick={HandleChange6} />
                    <img src="https://cdn-icons-png.flaticon.com/128/10010/10010984.png" alt="" onClick={HandleChange7} />
                </div>
            )}
        </aside>
    );
};

const MainContent = ({
    authUser,
    isAdmin,
    adminPanel,
    setAdminPanel,
}) => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); // Используем контекст из FavoritesContext

    const handleAddToFavorites = (item) => {
        addToFavorites(item);
    };

    const handleRemoveFromFavorites = (id) => {
        removeFromFavorites(id);
    };
    const [check, setCheck] = useState(true)
    // const [name, setName] = useState('')

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                setCheck(false)
            })
            .catch((e) => console.log(e));
    };
    // const handleUpdateUserName = () => {
    //     setName(userName)
    //     console.log(`Updated user name: ${userName}`);
    // };
    return (
        <main className="main-content relative top-24">
            <section className="user-info">
                <h2>Информация о пользователе</h2>
                {authUser ? (
                    <div>
                        <p>Email: {authUser.email}</p>
                    </div>
                ) : (
                    <p>Пользователь не авторизован</p>
                )}
                <div className='user-panel absolute top-0 right-0 m-4'>
                    {check
                        ?
                        <button onClick={userSignOut} className='logout-button text-white border px-4 py-2 rounded-lg'>Sign Out</button>
                        :
                        <Link to={'/sign-in'}> <p className='text-blue-500'>Войти в аккаунт</p> </Link>
                    }

                </div>
            </section>
            <div className="favorites ml-4">
                <h3>Избранные</h3>
                <ul>
                    {favorites?.map((item) => (
                        <li key={item.id}>
                            <Link to={`/movie/${item.id}`}>
                                <span>{item.title || item.name}</span>
                            </Link>
                            <button onClick={() => handleRemoveFromFavorites(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
            {isAdmin && (
                <section className="admin-panel">
                    <h2>Административная панель</h2>
                    <button onClick={() => setAdminPanel(!adminPanel)}>
                        {adminPanel ? 'Скрыть' : 'Показать'} панель
                    </button>
                    {adminPanel && <p>Админка</p>}
                </section>
            )}
        </main>
    );
};

export default AuthDetails;
