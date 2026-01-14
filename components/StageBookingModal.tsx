import React, { useState } from 'react';
import { X, Calendar, Users, BookOpen, CheckCircle, GraduationCap, ArrowRight, Lightbulb } from 'lucide-react';

interface StageBookingModalProps {
  onClose: () => void;
}

type PathType = 'AFM' | 'CAT' | 'AGRARIA' | 'ELETTRONICA' | 'ALBERGHIERO';

interface PathInfo {
  id: PathType;
  name: string;
  description: string;
  topics: string[];
  icon: React.ReactNode;
  color: string;
}

const PATHS: PathInfo[] = [
  {
    id: 'AFM',
    name: 'Economia & Informatica',
    description: 'I nostri studenti del triennio ti insegneranno come creare un business plan semplificato o i primi passi nel coding gestionale.',
    topics: ['Creazione Logo Aziendale', 'Basi di Excel Divertente', 'Social Media Marketing'],
    icon: <Users size={20} />,
    color: 'bg-sky-100 text-sky-600'
  },
  {
    id: 'CAT',
    name: 'Costruzioni (CAT)',
    description: 'Affianca i nostri "futuri geometri" in laboratorio per scoprire come si progetta una stanza in 3D con software professionali.',
    topics: ['Modellazione 3D', 'Uso del Drone in Cantiere', 'Materiali Eco-Sostenibili'],
    icon: <BookOpen size={20} />,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'AGRARIA',
    name: 'Agraria & Ambiente',
    description: 'Passa una mattinata in serra con gli studenti tutor: ti mostreranno come curare le piante e analizzare il terreno.',
    topics: ['Innesti e Talee', 'Analisi del Terreno', 'Gestione Serra Domotica'],
    icon: <CheckCircle size={20} />,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'ELETTRONICA',
    name: 'Elettronica & Robotica',
    description: 'Mettiti alla prova con i circuiti! Gli studenti dell\'ultimo anno ti guideranno nella programmazione di un piccolo robot.',
    topics: ['Arduino per Principianti', 'Saldatura Circuiti', 'Gare di Robotica'],
    icon: <Lightbulb size={20} />,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    id: 'ALBERGHIERO',
    name: 'Enogastronomia',
    description: 'Entra nelle nostre cucine didattiche: gli studenti-chef ti sveleranno i segreti della pasticceria o dell\'accoglienza.',
    topics: ['Show Cooking tra Pari', 'L\'arte dell\'Accoglienza', 'Decorazioni di Pasticceria'],
    icon: <GraduationCap size={20} />,
    color: 'bg-rose-100 text-rose-600'
  }
];

export const StageBookingModal: React.FC<StageBookingModalProps> = ({ onClose }) => {
  const [selectedPath, setSelectedPath] = useState<PathType | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-50 flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[95vh] animate-zoom-in">
        
        {/* Left Side: Info & Selection */}
        <div className="w-full md:w-2/5 bg-emerald-50/50 p-8 border-r border-emerald-100 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h3 className="font-lexend text-2xl font-black text-slate-800 mb-2">Studente per un Giorno</h3>
            <p className="text-sm text-slate-500 font-medium">Prenota una lezione speciale dove i nostri studenti saranno i tuoi professori!</p>
          </div>

          <div className="space-y-3">
            {PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center gap-4 group ${
                  selectedPath === path.id 
                    ? 'bg-white border-emerald-300 shadow-md ring-2 ring-emerald-100' 
                    : 'bg-white/50 border-transparent hover:border-emerald-100 hover:bg-white'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${path.color}`}>
                  {path.icon}
                </div>
                <div>
                  <p className="font-lexend font-bold text-slate-800 text-sm">{path.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Sessione Aperta</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Form / Details */}
        <div className="w-full md:w-3/5 p-8 relative overflow-y-auto custom-scrollbar">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-600 transition-colors">
            <X size={24} />
          </button>

          {!selectedPath ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500">
                <Users size={40} />
              </div>
              <div className="max-w-xs">
                <h4 className="font-lexend text-xl font-bold text-slate-800 mb-2">Scegli la tua lezione</h4>
                <p className="text-sm text-slate-500">Scopri cosa imparerai dai tuoi futuri compagni di scuola e riserva il tuo posto.</p>
              </div>
            </div>
          ) : isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={40} />
              </div>
              <h4 className="font-lexend text-2xl font-black text-slate-800">Richiesta Ricevuta!</h4>
              <p className="text-slate-500 max-w-xs mx-auto">Ti contatteremo prestissimo via email per confermare la data della tua lezione in presenza.</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              {PATHS.find(p => p.id === selectedPath) && (
                <div className="space-y-8">
                  <div>
                    <h4 className="font-lexend text-2xl font-black text-emerald-600 mb-2">
                      {PATHS.find(p => p.id === selectedPath)?.name}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {PATHS.find(p => p.id === selectedPath)?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-lexend font-bold text-slate-400 uppercase tracking-widest mb-2">Laboratorio Pratico</p>
                      <ul className="space-y-1">
                        {PATHS.find(p => p.id === selectedPath)?.topics.map((topic, i) => (
                          <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-lexend font-bold text-emerald-400 uppercase tracking-widest mb-2">Insegnanti Speciali</p>
                      <p className="text-xs font-bold text-emerald-800">Studenti del 4° e 5° anno</p>
                      <p className="text-[10px] text-emerald-600 font-medium">Un'ora di vera vita scolastica</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-lexend font-bold text-slate-400 uppercase ml-1">Tuo Nome</label>
                        <input 
                          required
                          type="text"
                          placeholder="Nome e Cognome"
                          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-lexend font-bold text-slate-400 uppercase ml-1">Tua Email (o Genitore)</label>
                        <input 
                          required
                          type="email"
                          placeholder="email@esempio.it"
                          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-lexend font-bold text-slate-400 uppercase ml-1">Scuola Media di provenienza</label>
                        <input 
                          required
                          type="text"
                          placeholder="Nome della tua scuola attuale"
                          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          value={formData.school}
                          onChange={e => setFormData({...formData, school: e.target.value})}
                        />
                      </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-lexend font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      Richiedi Partecipazione <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
