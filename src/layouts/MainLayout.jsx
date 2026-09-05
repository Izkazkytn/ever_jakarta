import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-brand-text-main antialiased selection:bg-brand-primary-soft">
      {/* Top Navbar */}
      <Navbar />

      {/* Dynamic Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>

{/* Footer */}
<footer className="hidden md:block bg-brand-surface/60 border-t border-brand-border py-8 mt-auto backdrop-blur-md">
  <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
    <div className="flex justify-center">
      <img src="/logo.jpg" alt="EVER Jakarta" className="w-8 h-8 rounded-lg object-cover opacity-80" />
    </div>
    <p className="text-xs text-brand-text-muted">
      © {new Date().getFullYear()} EVER Jakarta Community Hub. All rights reserved.
    </p>
    <p className="text-[10px] text-zinc-400">
      Designed with Korean Aesthetic for EVAN & EVER Community.
    </p>
  </div>
</footer>

      {/* Bottom Bar for Mobile Devices */}
      <MobileNav />
    </div>
  );
}