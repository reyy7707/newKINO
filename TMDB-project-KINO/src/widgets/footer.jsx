import { Link } from 'react-router-dom'
import telegram_icon from '../assets/img/Telegram_white.png'
import instagram_icon from '../assets/img/Instagram_white.png'
import twitter_icon from '../assets/img/twitter_white.png'

const Footer = () => {
    return (
        <>
            <div className='flex w-full h-auto border-t border-slate-500 items-center justify-center bg-[#0f0f0f] mt-36'>
                <div className='flex items-center h-auto w-4/6 justify-between p-6'>
                    <div className='flex items-center w-1/6 gap-y-4'>
                        <h1 className='text-2xl text-white font-Nunito'> KINO </h1>
                    </div>
                    <div className='flex items-center justify-between w-[8rem]'>
                        <Link> <img src={telegram_icon} alt='telegram' /> </Link>
                        <Link> <img src={instagram_icon} alt='instagram' /> </Link>
                        <Link> <img src={twitter_icon} alt='github' /> </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer