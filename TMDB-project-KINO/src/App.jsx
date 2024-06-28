import { Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Details';
import Home from './pages/Home';
import DefinePerson from './pages/DefinePerson';
import Footer from './widgets/footer';
import Header from './widgets/header';
import AuthDetails from './pages/AuthDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/error/ErrorPage';
import CatalogFilters from './pages/catalog-filters/CatalogFilters';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<><Header /><Home /> <Footer /></>} />
        <Route path='/personal-area' element={<><Header /> <AuthDetails /><Footer /></>} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/:category' element={<><Header /><Catalog /><Footer /></>} />
        <Route path='/person/:id' element={<><Header /><DefinePerson /><Footer /></>} />
        <Route path='/:category/:id' element={<><Header /> <Detail /><Footer /></>} />
        <Route path='/:category/search/:keyword' element={<><Header /><Catalog /><Footer /></>} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/catalog-filters' element={<><Header /> <CatalogFilters /> <Footer /></>}/>
      </Routes>
    </>
  );
};

export default App;
