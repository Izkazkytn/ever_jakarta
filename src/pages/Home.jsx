import { Link } from 'react-router-dom';
import { Camera, Calendar, Sparkles, Heart, ArrowRight, MapPin } from 'lucide-react';

// Single Highlight Event: Coming Soon Birthday Cafe
const UPCOMING_HIGHLIGHT = {
  id: 1,
  title: 'EVAN Birthday Cafe Event 2026',
  category: 'Birthday Project',
  date: 'October 2026',
  location: 'Will be announced soon',
  description: 'Gathering & birthday cafe gathering khusus EVER! Bakal ada dekorasi eksklusif, fankit freebies, dan EVERFrame photobooth.',
  image: 'birthday2026evan.jpeg',
};

export default function Home() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      
      {/* HERO BANNER CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-border p-6 sm:p-10 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-md scale-105 z-0"
          style={{ backgroundImage: "url('/evan-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 via-black/50 to-black/80 z-0" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* SISI KIRI: DESKRIPSI & TOMBOL AKSI */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} />
              <span>Official Community Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Abadikan Momen Manis Bersama <span className="text-brand-primary">EVER JAKARTA</span>
            </h1>
            
            <p className="text-brand-text-muted text-xs sm:text-sm max-w-lg">
              Platform komunitas resmi untuk event, dokumentasi galeri, dan frame photobooth eksklusif (EVERFrame) khusus untuk kamu dan EVAN.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/everframe"
                className="py-3 px-5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-primary/30 transition-all active:scale-95"
              >
                <Camera size={16} />
                <span>Coba EVERFrame (Photobooth)</span>
              </Link>
              
              <Link
                to="/events"
                className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all active:scale-95"
              >
                <Calendar size={16} />
                <span>Lihat Event</span>
              </Link>
            </div>
          </div>

          {/* SISI KANAN: FOTO EVAN PORTRAIT (evankanan.jpg) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-56 sm:w-64 h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative group bg-black/40">
              <img
                src="/evankanan.jpg"
                alt="EVAN"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* WELCOME CARD SECTION */}
      <div className="p-6 sm:p-8 bg-brand-surface/80 border border-brand-border rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs backdrop-blur-md">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-brand-text-main flex items-center gap-2">
            Selamat Datang, EVERs! <Heart size={16} className="text-brand-primary fill-brand-primary" />
          </h2>
          <p className="text-xs text-brand-text-muted max-w-xl leading-relaxed">
            EVER JAKARTA adalah ruang berkumpul digital untuk mendukung EVAN, memantau jadwal event mendatang, serta mengabadikan keseruan lewat bingkai foto interaktif.
          </p>
        </div>

        <Link
          to="/about"
          className="py-2.5 px-4 bg-brand-primary-soft text-brand-primary rounded-2xl text-xs font-bold hover:bg-brand-primary hover:text-white transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Tentang Komunitas</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* HIGHLIGHT EVENT SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-text-main">Highlight Event</h2>
            <p className="text-xs text-brand-text-muted">Event mendatang yang paling ditunggu-tunggu</p>
          </div>

          <Link
            to="/events"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* SINGLE FEATURED CARD */}
        <div className="bg-brand-surface/80 border border-brand-border rounded-3xl overflow-hidden p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-brand-primary/50 transition-all group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-5 h-48 sm:h-52 rounded-2xl overflow-hidden bg-black/40 relative">
              <img
                src={UPCOMING_HIGHLIGHT.image}
                alt={UPCOMING_HIGHLIGHT.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold shadow-md">
                {UPCOMING_HIGHLIGHT.category}
              </span>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                Coming Soon
              </div>

              <h3 className="text-xl font-bold text-brand-text-main group-hover:text-brand-primary transition-colors">
                {UPCOMING_HIGHLIGHT.title}
              </h3>

              <p className="text-xs text-brand-text-muted leading-relaxed">
                {UPCOMING_HIGHLIGHT.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-brand-text-muted pt-2 border-t border-brand-border/60">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <Calendar size={14} className="text-brand-primary" />
                  {UPCOMING_HIGHLIGHT.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-primary" />
                  {UPCOMING_HIGHLIGHT.location}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}