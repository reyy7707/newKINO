import { Link } from "react-router-dom";
import icon from "../../assets/img/play-regular-24.png";
import Button from "../../components/button/Button";
import config from "../../api/apiConfig";

const TVSeasons = (props) => {  
    
  return (
    <div className="season"> 
      {props.item?.seasons.map((item, index) => {
        const bg = item.poster_path
          ? config.w500Image(item.poster_path)
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mcHVzLjjPjJNNYOT8v2f0rYU2C5wzvf_BnvhayR8N6ENCTXSP9quG0ejpmJ2w6EBWYw&usqp=CAU';
        
        return (
          <Link className="movie__link" key={index}>
            <div
              className="movie-card"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <Button>
                <img src={icon} alt={item.title} />
              </Button>
            </div>
            <h3>{item.title || item.name}</h3>
          </Link>
        );
      })}
    </div>
  );
};

export default TVSeasons;
