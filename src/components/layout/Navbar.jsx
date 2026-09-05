import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Upcoming Events' },
  { path: '/everframe', label: 'EVERFrame', isHighlight: true },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-bg/70 border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO & BRAND BRANDING */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-brand-primary/40 shadow-md group-hover:scale-105 transition-transform">
            <img 
              src="/logo.jpg" 
              alt="EVER Jakarta Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-lg text-white tracking-wide">
            EVER <span className="text-brand-primary">Jakarta</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            
            if (item.isHighlight) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="ml-2 px-4 py-2 rounded-xl bg-brand-primary text-white font-bold text-xs shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>📷</span>
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-brand-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}