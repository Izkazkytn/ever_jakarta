import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import EVERFrame from './pages/Everframe';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import About from './pages/About'; // <-- Import About Page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="EVERFrame" element={<EVERFrame />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} /> {/* <-- Pasang Komponen */}
      </Route>
    </Routes>
  );
}