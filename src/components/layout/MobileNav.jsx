import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, Image, Info, Camera } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'EVERFrame', path: '/EVERFrame', icon: Camera, highlight: true },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-surface/90 backdrop-blur-lg border-t border-brand-border px-3 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/30 active:scale-95 transition-transform">
                  <Icon size={22} />
                </div>
                <span className="text-[10px] font-semibold text-brand-primary mt-1">
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-brand-primary font-semibold'
                  : 'text-brand-text-muted hover:text-brand-text-main'
              }`}
            >
              <Icon size={20} />
              <span className="text-[11px] mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}