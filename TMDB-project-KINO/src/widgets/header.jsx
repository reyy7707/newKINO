import React, { useEffect, useRef } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV",
    path: "/tv",
  },
  {
    display: 'Actors',
    path: '/person'
  },
  {
    display: 'Catalog',
    path: '/catalog-filters'
  },
  {
    display: 'Profile',
    path: '/personal-area'
  }
];
const Header = () => {
  const headerRef = useRef(null)
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);
  return (
    <header ref={headerRef} className={'header'}>
      <div className={`header__wrap header__container`}>
        <div className={'logo'}>
          <Link to={"/"}>KINO</Link>
        </div>
        <ul className={'header__nav'}>
          {headerNav.map((item, index) => (
            <li key={index}>
              <NavLink activeClassName={'active'} className={'header__link'} to={item.path}>
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
