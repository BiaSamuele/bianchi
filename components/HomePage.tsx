import React from 'react';
import { ArrowRight, School, Clock, FileText, ChevronRight, Sparkles, Leaf, Recycle, Globe } from 'lucide-react';

interface HomePageProps {
  onStart: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart, isDarkMode, toggleTheme }) => {
  const curriculumLinks = [
    {
      title: "Tecnico Economico",
      subtitle: "Gestisci l'economia di domani",
      url: "https://www.gdromagnosi.it/indirizzi-di-studio/istituto-tecnico-economico",
      accent: "border-l-4 border-sky-400",
      icon: <Clock size={20} className="text-sky-600" />
    },
    {
      title: "Costruzioni e Agraria",
      subtitle: "Progetta e proteggi l'ambiente",
      url: "https://www.gdromagnosi.it/indirizzi-di-studio/istituto-tecnico-tecnologico",
      accent: "border-l-4 border-emerald-500",
      icon: <Leaf size={20} className="text-emerald-600" />
    },
    {
      title: "Elettronica",
      subtitle: "Automazione e Green Tech",
      url: "https://www.gdromagnosi.it/indirizzi-di-studio/istituto-tecnico-tecnologico", 
      accent: "border-l-4 border-amber-400",
      icon: <Recycle size={20} className="text-amber-600" />
    },
    {
      title: "Professionale",
      subtitle: "Servizi per la comunità",
      url: "https://www.gdromagnosi.it/indirizzi-di-studio/istituto-professionale",
      accent: "border-l-4 border-rose-400",
      icon: <School size={20} className="text-rose-600" />
    }
  ];

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden bg-emerald-50/30">
      
      {/* Eco Background Elements */}
      <div className="eco-container">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className={`leaf leaf-${i}`} viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10">
        <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center gap-12 md:gap-16">
            
            {/* Logo and Welcome Section */}
            <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
                <div className="relative p-6 bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 mb-4">
                    <img 
                      src="https://20.gdromagnosi.it/img/xtra/logo.png" 
                      alt="Logo ISIS G.D. Romagnosi" 
                      className="h-24 md:h-32 w-auto object-contain"
                    />
                    <a 
                      href="https://www.gdromagnosi.it/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer group/globe"
                      title="Visita il sito ufficiale"
                    >
                        <Globe size={20} className="group-hover/globe:rotate-12 transition-transform" />
                    </a>
                </div>
                
                <div className="space-y-2">
                    <p className="font-lexend text-emerald-600 text-sm md:text-lg font-bold uppercase tracking-[0.3em]">
                        Orientamento 2025/26
                    </p>
                    <h1 className="font-lexend text-4xl md:text-7xl font-black eco-gradient-text tracking-tight leading-tight">
                        Coltiva il tuo Talento
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Entra a far parte di una comunità che guarda al futuro con innovazione e rispetto per l'ambiente. La tua strada inizia qui all'ISIS G.D. Romagnosi.
                    </p>
                </div>

                <div className="pt-8">
                    <button 
                        onClick={onStart}
                        className="group relative px-10 py-5 bg-emerald-600 text-white rounded-3xl font-lexend text-xl font-bold tracking-wide transition-all duration-300 hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-200 hover:-translate-y-1 flex items-center gap-3"
                    >
                        Esplora la Scuola
                        <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl animate-fade-in [animation-delay:0.2s]">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">Internazionale</h5>
                        <p className="text-xs text-slate-500">Erasmus+ e stage all'estero</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 shrink-0">
                        <Recycle size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">Sostenibile</h5>
                        <p className="text-xs text-slate-500">Curricoli Green e Green Tech</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">Innovativa</h5>
                        <p className="text-xs text-slate-500">Laboratori 4.0 avanzati</p>
                    </div>
                </div>
            </div>

            {/* Curriculum Cards */}
            <div className="w-full animate-fade-in [animation-delay:0.4s] pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {curriculumLinks.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group p-8 glass-card rounded-[2.5rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white border-b-4 border-emerald-500/20 ${link.accent}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-slate-50 shadow-inner border border-slate-100">
                                  {link.icon}
                                </div>
                                <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            </div>
                            
                            <h4 className="font-lexend text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">
                                {link.title}
                            </h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                {link.subtitle}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            <footer className="w-full mt-8 border-t border-emerald-100 pt-10 pb-12 text-center text-xs text-emerald-800 font-lexend tracking-[0.2em]">
                <p className="font-black text-sm mb-2">ISIS G.D. ROMAGNOSI</p>
                <p className="opacity-70">ERBA (CO) • LONGONE AL SEGRINO</p>
                <div className="mt-8 flex justify-center gap-8 opacity-50">
                    <span className="flex items-center gap-2"><Recycle size={12}/> Ambiente</span>
                    <span>•</span>
                    <span className="flex items-center gap-2"><Globe size={12}/> Futuro</span>
                    <span>•</span>
                    <span className="flex items-center gap-2"><Leaf size={12}/> Crescita</span>
                </div>
            </footer>

        </div>
      </main>
    </div>
  );
};