import "./DefinePerson.css";
import config from "../../api/apiConfig";
import MovieList from "../movie/MovieList";
import { category } from "../../api/tmdb";

const Info = ({ item,id, ...props }) => { 

  const bg = item?.profile_path ? config.w500Image(item.profile_path) : 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png';
  
  return (
    <div className="person__info">
      <div className="person__container">
        <div className="person__side">
          <div className="person__poster">
            <img className="person__poster_img" src={bg} alt="" />
          </div>

          <div className="personal__info">
            <h1 className="personal__title">Personal Info</h1>
            {item?.known_for_department && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Known for:</div>
                <div className="personal__info_item_subtitle">
                  {item.known_for_department}
                </div>
              </div>
            )}
            {item?.place_of_birth && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Place of Birth:</div>
                <div className="personal__info_item_subtitle">
                  {item.place_of_birth}
                </div>
              </div>
            )}
            {item?.birthday && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Date of Birth:</div>
                <div className="personal__info_item_subtitle">
                  {item.birthday}
                </div>
              </div>
            )}
            {item?.gender && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Gender:</div>
                <div className="personal__info_item_subtitle">
                  {item?.gender === 2
                    ? "Male"
                    : item?.gender === 1
                    ? "Female"
                    : "Unknown"}
                </div>
              </div>
            )}
            {item?.also_known_as.length === 0 && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Also known as:</div>
                {item.also_known_as.map((item, index) => (
                  <div key={index} className="personal__info_item_subtitle">
                    {item}
                  </div>
                ))}
              </div>
            )}
            {item?.popularity && (
              <div className="personal__info_item">
                <div className="personal__info_item_title">Popularity:</div>
                <div className="personal__info_item_subtitle">
                  {item.popularity}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="person__content-info">
          <div>
            <h1 className="person__name">{item?.name}</h1>
            <div className="person__bio">
              <h3 className="bio__title">Biography</h3>
              <div className="bio__subtitle">{item?.biography}</div>
            </div>
          </div>
          <div className="person__list">
            <MovieList 
            setError={props.setError}
              category={category.person}
              type={"personCredits"} 
              id={id || item.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
