import { useState } from 'react';
import { Sparkles, Calendar, MapPin, Tag, CheckCircle2, Clock } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'EVAN Debut Celebration: Free Coffee Support',
    category: 'Fan Support',
    status: 'Selesai',
    date: '07 Juni 2026',
    location: 'Blok M, Jakarta Selatan',
    description: 'Proyek perayaan debut EVAN lewat aksi bagi-bagi Kopi Jago gratis untuk para EVERs di area Blok M. Berjalan sukses, meriah, dan ludes!',
    image: 'evanjago.jpeg',
    organizer: 'Presented by @ccevvan_ x @zahraalatifah & Team',
  },
  {
    id: 2,
    title: 'EVAN Birthday Cafe Event 2026',
    category: 'Birthday Project',
    status: 'Mendatang',
    date: 'Will be announced soon',
    location: 'Will be announced soon',
    description: 'Birthday cafe gathering spesial merayakan ulang tahun EVAN! Akan ada dekorasi eksklusif, pembagian fankit, dan photobooth EVERFrame.',
    image: 'birthday2026evan.jpeg',
    organizer: 'EVER JAKARTA Team',
  },
];

const CATEGORIES = ['Semua', 'Fan Support', 'Birthday Project'];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredEvents = selectedCategory === 'Semua'
    ? EVENTS_DATA
    : EVENTS_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 pt-4">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-semibold backdrop-blur-md">
          <Sparkles size={14} />
          <span>Community Projects</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-text-main">
          EVER <span className="text-brand-primary">Events & Projects</span>
        </h1>
        <p className="text-brand-text-muted text-xs sm:text-sm max-w-md mx-auto">
          Daftar kegiatan fan support dan project perayaan resmi dari EVER Jakarta untuk EVAN.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                : 'bg-brand-surface/80 border border-brand-border text-brand-text-main hover:bg-brand-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EVENTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-brand-surface/80 border border-brand-border rounded-3xl overflow-hidden shadow-xl backdrop-blur-md flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden bg-black/40">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-primary text-[10px] font-bold border border-white/10">
                  {event.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 backdrop-blur-md ${
                    event.status === 'Selesai'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {event.status === 'Selesai' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {event.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-brand-text-main leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-brand-border text-xs text-brand-text-muted">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <Tag size={12} className="text-brand-primary" />
                  <span>{event.organizer}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}