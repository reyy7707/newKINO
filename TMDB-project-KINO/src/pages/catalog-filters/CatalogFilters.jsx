import 'swiper/css';
import PropTypes from 'prop-types'
import s from './CatalogFilters.module.css'
import PageHeader from '../../components/page-header/PageHeader';
// import { category as cate } from '../../api/tmdb';
import tmdbApi, { movieType, tvType } from '../../api/tmdb';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { category } from '../../api/tmdb';
import MovieCard from '../../components/movie-card/MovieCard';
import { OutlinedButton } from '../../components/button/Button';
import Input from '../../components/input/input';

const ToggleSection = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className='flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
      <span className='font-medium text-white'>{title}</span>
      <span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="white" />
        </svg>
      </span>
    </div>
  );
};
ToggleSection.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.string,
  onClick: PropTypes.func,
}

const ToggleButton = ({ label, isActive, onClick }) => {
  return (
    <div onClick={onClick} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
      <div className={(isActive ? 'bg-white' : 'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
        <svg className='duration-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="26px" height="26px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z" /></svg>
      </div>
      <span className={`${isActive && 'text-white font-medium'}`}>{label}</span>
    </div>
  );
};
ToggleButton.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.string,
  onClick: PropTypes.func,
}

function CatalogMenu() {

  const [year, setYear] = useState(false)
  const [genres, setGenres] = useState(true)
  const [formats, setFormats] = useState(true)
  const [status, setStatus] = useState(false)

  const [startDate, setStartDate] = useState('')

  const [action, setAction] = useState(false)
  const [adventure, setAdventure] = useState(false)
  const [school, setSchool] = useState(false)
  const [comedy, setComedy] = useState(false)
  const [drama, setDrama] = useState(false)
  const [fantasy, setFantasy] = useState(false)
  const [family, setFamily] = useState(false)
  const [western, setWestern] = useState(false)
  const [music, setMusic] = useState(false)
  const [mystery, setMystery] = useState(false)
  const [romance, setRomance] = useState(false)
  const [sciFi, setSciFi] = useState(false)
  const [sports, setSports] = useState(false)
  const [survival, setSurvival] = useState(false)

  const [tv, setTv] = useState(false)
  const [ova, setOva] = useState(false)
  const [ona, setOna] = useState(false)
  const [movie, setMovie] = useState(false)
  const [special, setSpecial] = useState(false)
  const [music1, setMusic1] = useState(false)

  const [airing, setAiring] = useState(false)
  const [complete, setComplete] = useState(false)
  const [upcoming, setUpcoming] = useState(false)

  return (
    <>
      <div className='flex flex-col pt-24 pl-4 bg-catalog'>
        <div>
          <ToggleSection title="Year" isOpen={year} onClick={() => setYear(!year)} />
          <div className={`relative overflow-hidden duration-300 flex gap-3 items-start`} style={{ height: year ? 0 : '74px', visibility: year === 0 ? 'hidden' : 'visible' }}>
            <span className='h-[44px] flex items-center cursor-pointer'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 1C8.05228 1 8.5 1.44772 8.5 2V3H15.5V2C15.5 1.44772 15.9477 1 16.5 1C17.0523 1 17.5 1.44772 17.5 2V3.02469C20.0267 3.27555 22 5.40733 22 8V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V8C2 5.40733 3.97334 3.27555 6.5 3.02469V2C6.5 1.44772 6.94772 1 7.5 1ZM4.17071 7H19.8293C19.4175 5.83481 18.3062 5 17 5H7C5.69378 5 4.58254 5.83481 4.17071 7ZM20 9H4V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V9Z" fill="white" />
              </svg>
            </span>
            <input value={startDate} onChange={e => setStartDate(e.target.value)} className='outline-none border-2 focus:border-white/80 border-white/30 bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl' type="text" min="1960" max="2026" step="1" placeholder="2007-12-17" />
          </div>

          <ToggleSection title="Genres" isOpen={genres} onClick={() => setGenres(!genres)} />
          <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: genres ? 0 : '666px', visibility: genres === 0 ? 'hidden' : 'visible' }}>
            <ToggleButton label="Action" isActive={action} onClick={() => setAction(!action)} />
            <ToggleButton label="Adventure" isActive={adventure} onClick={() => setAdventure(!adventure)} />
            <ToggleButton label="School" isActive={school} onClick={() => setSchool(!school)} />
            <ToggleButton label="Comedy" isActive={comedy} onClick={() => setComedy(!comedy)} />
            <ToggleButton label="Drama" isActive={drama} onClick={() => setDrama(!drama)} />
            <ToggleButton label="Fantasy" isActive={fantasy} onClick={() => setFantasy(!fantasy)} />
            <ToggleButton label="Family" isActive={family} onClick={() => setFamily(!family)} />
            <ToggleButton label="Western" isActive={western} onClick={() => setWestern(!western)} />
            <ToggleButton label="Music" isActive={music} onClick={() => setMusic(!music)} />
            <ToggleButton label="Mystery" isActive={mystery} onClick={() => setMystery(!mystery)} />
            <ToggleButton label="Romance" isActive={romance} onClick={() => setRomance(!romance)} />
            <ToggleButton label="Sports" isActive={sports} onClick={() => setSports(!sports)} />
            <ToggleButton label="Survival" isActive={survival} onClick={() => setSurvival(!survival)} />
            <ToggleButton label="SciFi & Fantasy" isActive={sciFi} onClick={() => setSciFi(!sciFi)} />
          </div>

          <ToggleSection title="Formats" isOpen={formats} onClick={() => setFormats(!formats)} />
          <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: formats ? 0 : '230px', visibility: formats === 0 ? 'hidden' : 'visible' }}>
            <ToggleButton label="TV" isActive={tv} onClick={() => { setTv(!tv); setOva(false); setOna(false); setMovie(false); setSpecial(false); setMusic1(false) }} />
            <ToggleButton label="OVA" isActive={ova} onClick={() => { setOva(!ova); setTv(false); setOna(false); setMovie(false); setSpecial(false); setMusic1(false) }} />
            <ToggleButton label="ONA" isActive={ona} onClick={() => { setOna(!ona); setTv(false); setOva(false); setMovie(false); setSpecial(false); setMusic1(false) }} />
            <ToggleButton label="Movie" isActive={movie} onClick={() => { setMovie(!movie); setTv(false); setOva(false); setOna(false); setSpecial(false); setMusic1(false) }} />
            <ToggleButton label="Special" isActive={special} onClick={() => { setSpecial(!special); setTv(false); setOva(false); setOna(false); setMovie(false); setMusic1(false) }} />
            <ToggleButton label="Music" isActive={music1} onClick={() => { setMusic1(!music1); setTv(false); setOva(false); setOna; setMovie(false); setSpecial(false) }} />
          </div>

          <ToggleSection title="Status" isOpen={status} onClick={() => setStatus(!status)} />
          <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: status ? 0 : '100px', visibility: status === 0 ? 'hidden' : 'visible' }}>
            <ToggleButton label="Airing" isActive={airing} onClick={() => { setAiring(!airing); setComplete(false); setUpcoming(false) }} />
            <ToggleButton label="Complete" isActive={complete} onClick={() => { setComplete(!complete); setAiring(false); setUpcoming(false) }} />
            <ToggleButton label="UpComing" isActive={upcoming} onClick={() => { setUpcoming(!upcoming); setAiring(false); setComplete(false) }} />
          </div>
        </div>
      </div>
    </>
  );
}

const MovieGrid = (props) => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        let res = null;

        if (keyword === undefined) {
          const params = {};
          switch (props.category) {
            case category.movie:
              res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
              break;
            case category.person:
              res = await tmdbApi.person("popular", { params });
              break;
            default:
              res = await tmdbApi.getTvList(tvType.popular, { params });
          }
        } else {
          const params = {
            query: keyword,
          };
          res = await tmdbApi.search(props.category, { params });
        }
        setItems(res.data.results);
        setTotal(res.data.total_pages);
      } catch (error) {
        console.log(error);
        props.setError(true);
      }
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, props.category]);
  const loadMore = async () => {
    let res = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        case category.person:
          res = await tmdbApi.person("popular", { params });
          break;
        default:
          res = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        query: keyword,
        page: page + 1,
      };
      res = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...res.data.results]);
    setPage(page + 1);
  };
  return (
    <>
      <div>
        <MovieSearch keyword={keyword} category={props.category} />
      </div>
      {items.length === 0 && (
        <div className="movie-no-result">No results matching your search</div>
      )}
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard
            isActor={props.category === "person"}
            item={item}
            key={index}
            category={props.category}
          />
        ))}
      </div>
      {page < total ? (
        <div className="movie-grid__loadmore">
          <OutlinedButton className="small" onClick={loadMore}>
            Load More
          </OutlinedButton>
        </div>
      ) : null}
    </>
  );
};
const MovieSearch = (props) => {
  const nav = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      nav(`/movie/search/${keyword}`);
    }
  }, [keyword, props.category, nav]);
  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch, keyword]);
  return (
    <div className="movie-search">
      <Input
        type={"text"}
        placeholder={"Enter keyword"}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Input>
      <button className='px-2 py-1 ml-3 bg-blue-600 text-white rounded-full' onClick={goToSearch}>
        Search
      </button>
    </div>
  );
};

const CatalogFilters = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>
        {category === 'movie' ? "Movies" : category === 'tv' ? 'Tv Series' : 'Catalog'}
      </PageHeader>
      <main className={s.main}>
        <CatalogMenu />
        <div className='mt-32 ml-4'>
          <MovieGrid/>
        </div>
      </main>
    </>
  );
}

export default CatalogFilters
