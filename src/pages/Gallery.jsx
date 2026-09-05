import { useState } from 'react';
import { Sparkles, Filter, X, ZoomIn, Calendar, MapPin } from 'lucide-react';

const GALLERY_DATA = [
  {
    id: 1,
    title: 'EVAN Debut Free Coffee Support (Kopi Jago)',
    category: 'Fan Support',
    date: '07 Juni 2026',
    location: 'Blok M, Jakarta',
    image: 'evanjago.jpeg',
    caption: 'Momen keseruan perayaan debut EVAN lewat aksi traktir Kopi Jago gratis untuk para EVERs yang hadir di Blok M!',
  },
  {
    id: 1,
    type: 'image',
    title: 'EVAN Debut Free Coffee Support (Kopi Jago)',
    category: 'Fan Support',
    date: '07 Juni 2026',
    location: 'Blok M, Jakarta',
    image: 'evanjago1.jpeg',
    caption: 'Momen keseruan perayaan debut EVAN lewat aksi traktir Kopi Jago gratis untuk para EVERs yang hadir di Blok M!',
  },
    {
    id: 1,
    type: 'image',
    title: 'EVAN Debut Free Coffee Support (Kopi Jago)',
    category: 'Fan Support',
    date: '07 Juni 2026',
    location: 'Blok M, Jakarta',
    image: 'evanjago2.jpeg',
    caption: 'Momen keseruan perayaan debut EVAN lewat aksi traktir Kopi Jago gratis untuk para EVERs yang hadir di Blok M!',
  },
  {
    id: 2,
    title: 'Birthday Cafe Event 2026',
    category: 'Birthday Project',
    date: 'Will be announced soon',
    location: 'Will be announced soon',
    image: 'birthday2026evan.jpeg',
    caption: 'Something exciting is coming… Stay tuned, Ever! 🤍',
  },
];

const CATEGORIES = ['Semua', 'Fan Support', 'Birthday Project'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeImageModal, setActiveImageModal] = useState(null);

  const filteredGallery = selectedCategory === 'Semua'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 pt-4">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-semibold backdrop-blur-md">
          <Sparkles size={14} />
          <span>Community Memories</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-text-main">
          EVER <span className="text-brand-primary">Gallery</span>
        </h1>
        <p className="text-brand-text-muted text-xs sm:text-sm max-w-md mx-auto">
          Kumpulan dokumentasi momen manis dan keseruan kegiatan fans EVER Jakarta.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-muted mr-2">
          <Filter size={14} />
          <span>Kategori:</span>
        </div>
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

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImageModal(item)}
            className="group relative bg-brand-surface/80 border border-brand-border rounded-3xl overflow-hidden shadow-xl backdrop-blur-md cursor-pointer flex flex-col justify-between hover:border-brand-primary/50 transition-all"
          >
            <div className="h-60 w-full relative overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <ZoomIn size={20} />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-primary border border-white/10">
                {item.category}
              </div>
            </div>

            <div className="p-5 space-y-1.5">
              <h3 className="font-bold text-sm text-brand-text-main group-hover:text-brand-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-4 text-[11px] text-brand-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-brand-primary" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-brand-primary" />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-brand-surface rounded-3xl max-w-2xl w-full overflow-hidden border border-brand-border relative shadow-2xl space-y-0">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeImageModal.image}
                alt={activeImageModal.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-bold">
                  {activeImageModal.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-brand-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-brand-primary" />
                    {activeImageModal.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-brand-primary" />
                    {activeImageModal.location}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-brand-text-main">
                {activeImageModal.title}
              </h2>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                {activeImageModal.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}