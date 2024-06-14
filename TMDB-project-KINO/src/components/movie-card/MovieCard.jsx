import './MovieCard.css' 
import incon from '../../assets/img/play-regular-24.png' 
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import { category } from '../../api/tmdb'
import config from '../../api/apiConfig'  

const MovieCard = ({item,isActor,...props}) => {   

    const link = '/' + (item?.media_type || category[props.category]) + '/' + item.id
    const bg =  item.poster_path ? config.w500Image(item.poster_path) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mcHVzLjjPjJNNYOT8v2f0rYU2C5wzvf_BnvhayR8N6ENCTXSP9quG0ejpmJ2w6EBWYw&usqp=CAU'
    const bag = item.profile_path ? config.w500Image(item.profile_path ) : 'https://static.thenounproject.com/png/212110-200.png'
    return (
    <> 
    <Link className='movie__link' to={link}> 
        <div className='movie-card' style={{backgroundImage: `url(${isActor ? bag : bg})`}}>  
            <Button> 
            <img src={incon} alt={item.title}/>
            </Button>
        </div>
        <h3>{item.title || item.name}</h3>
    </Link>
    </>
    )
}

export default MovieCard