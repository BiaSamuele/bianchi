import React from 'react';
import { ShieldCheck, X, Info, Lock } from 'lucide-react';

interface PrivacyModalProps {
  onAccept: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100 flex flex-col animate-zoom-in">
        <div className="p-8 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-emerald-600">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-lexend text-xl font-bold text-slate-800">Informativa Privacy</h3>
          </div>
        </div>

        <div className="px-8 py-4 overflow-y-auto custom-scrollbar space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Benvenuto sul portale di orientamento dell'<strong>ISIS G.D. Romagnosi</strong>. La tua privacy è importante per noi.
          </p>
          
          <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Lock size={20} className="text-emerald-500 shrink-0" />
              <div className="text-sm">
                <p className="font-bold text-slate-800 mb-1">Dati Anonimi</p>
                <p className="text-slate-500">Non raccogliamo dati personali identificativi (nome, email) a meno che tu non decida di fornirli volontariamente tramite feedback.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100">
              <Info size={20} className="text-emerald-500 shrink-0" />
              <div className="text-sm">
                <p className="font-bold text-slate-800 mb-1">Gemini AI</p>
                <p className="text-slate-500">Il chatbot utilizza l'intelligenza artificiale di Google (Gemini) per rispondere. Ti consigliamo di non inserire dati sensibili nelle conversazioni.</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Cliccando su "Accetta e Continua", dichiari di aver preso visione dell'informativa e acconsenti all'uso delle tecnologie necessarie al funzionamento del servizio.
          </p>
        </div>

        <div className="p-8">
          <button 
            onClick={onAccept}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-lexend font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Accetta e Continua
          </button>
        </div>
      </div>
    </div>
  );
};
