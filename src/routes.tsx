import Home from './pages/Home';
import Listings from './pages/Listings';
import PGDetail from './pages/PGDetail';
import ListYourPG from './pages/ListYourPG';
import AreaPage from './pages/AreaPage';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Listings',
    path: '/listings',
    element: <Listings />
  },
  {
    name: 'PG Detail',
    path: '/pg/:id',
    element: <PGDetail />,
    visible: false
  },
  {
    name: 'List Your PG',
    path: '/list-your-pg',
    element: <ListYourPG />
  },
  {
    name: 'Area Page',
    path: '/area/:area',
    element: <AreaPage />,
    visible: false
  },
  {
    name: 'Pricing',
    path: '/pricing',
    element: <Pricing />
  },
  {
    name: 'About',
    path: '/about',
    element: <About />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQ />
  },
  {
    name: 'Privacy',
    path: '/privacy',
    element: <Privacy />
  },
  {
    name: 'Terms',
    path: '/terms',
    element: <Terms />
  }
];

export default routes;
