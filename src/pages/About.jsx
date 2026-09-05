import { Video, ArrowUpRight, Send, Globe } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    handle: '@ever_jakarta',
    url: 'https://instagram.com/ever_jakarta',
    icon: Globe,
    color: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
  },
  {
    name: 'TikTok',
    handle: '@ever_jakarta',
    url: 'https://tiktok.com/@ever_jakarta',
    icon: Video,
    color: 'bg-black text-white',
  },
  {
    name: 'X (Twitter)',
    handle: '@ever_jakarta',
    url: 'https://x.com/ever_jakarta',
    icon: Globe,
    color: 'bg-zinc-800 text-white',
  },
];

export default function About() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 pt-4">
      
      {/* CONNECT WITH US SECTION */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-brand-text-main">Connect With Us</h1>
          <p className="text-xs text-brand-text-muted">
            Ikuti kanal resmi EVER Jakarta agar tidak ketinggalan info event terbaru!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {SOCIAL_LINKS.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-brand-surface border border-brand-border rounded-2xl hover:border-brand-primary/50 transition-all flex items-center justify-between group shadow-xs backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${social.color}`}>
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-brand-text-main">{social.name}</p>
                    <p className="text-[10px] text-brand-text-muted">{social.handle}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-brand-text-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            );
          })}
        </div>
      </div>

      {/* JOIN MEMBERSHIP CALL-TO-ACTION */}
      <div className="p-8 sm:p-12 bg-brand-surface/80 border border-brand-border rounded-3xl text-center space-y-4 shadow-xl backdrop-blur-md">
        <h2 className="text-xl sm:text-3xl font-bold text-brand-text-main">
          Ingin Bergabung Jadi Bagian dari EVER Jakarta?
        </h2>
        <p className="text-xs sm:text-sm text-brand-text-muted max-w-xl mx-auto leading-relaxed">
          Dapatkan akses prioritas info gathering, pembagian fankit event, dan teman ngobrol sefrekuensi. Bebas biaya pendaftaran!
        </p>
        <div className="pt-2">
          <button
            onClick={() => alert('Terima kasih! Tautan pendaftaran membership akan segera dibuka.')}
            className="py-3 px-6 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-2xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-brand-primary/30 transition-all active:scale-95 cursor-pointer"
          >
            <Send size={14} />
            <span>Daftar Member EVER Jakarta</span>
          </button>
        </div>
      </div>

    </div>
  );
}