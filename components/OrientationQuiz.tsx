import React, { useState } from 'react';
import { ArrowRight, Trophy, X, Sparkles, Moon, Sun, Laptop, Book, Leaf, Construction, Coffee, Zap } from 'lucide-react';

interface QuizProps {
  onClose: () => void;
  onComplete: (result: string) => void;
  isDarkMode: boolean;
}

type Category = 'ECONOMICO' | 'TURISMO' | 'COSTRUZIONI' | 'AGRARIA' | 'ELETTRONICA' | 'PROFESSIONALE';

interface Option {
  text: string;
  points: Partial<Record<Category, number>>;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Quale di queste attività ti ispira di più?",
    options: [
      { text: "Capire come funziona un'azienda o un computer", points: { ECONOMICO: 3, ELETTRONICA: 2 } },
      { text: "Viaggiare e parlare nuove lingue", points: { TURISMO: 3, ECONOMICO: 1 } },
      { text: "Progettare case o usare strumenti di precisione", points: { COSTRUZIONI: 3, ELETTRONICA: 1 } },
      { text: "Stare a contatto con la natura e l'ambiente", points: { AGRARIA: 3, PROFESSIONALE: 1 } },
      { text: "Cucinare o aiutare le persone a stare meglio", points: { PROFESSIONALE: 3, AGRARIA: 1 } }
    ]
  },
  {
    id: 2,
    text: "Cosa ti piacerebbe fare da grande?",
    options: [
      { text: "Diventare un manager o un esperto di informatica", points: { ECONOMICO: 3, ELETTRONICA: 1 } },
      { text: "Organizzare tour o lavorare nel mondo del turismo", points: { TURISMO: 3, ECONOMICO: 1 } },
      { text: "Costruire edifici moderni ed ecosostenibili", points: { COSTRUZIONI: 3 } },
      { text: "Progettare sistemi elettronici intelligenti", points: { ELETTRONICA: 3 } },
      { text: "Lavorare nella ristorazione o nel sociale", points: { PROFESSIONALE: 3 } }
    ]
  },
  {
    id: 3,
    text: "Nel tuo tempo libero preferisci...",
    options: [
      { text: "Navigare sul web o giocare ai videogiochi", points: { ECONOMICO: 2, ELETTRONICA: 2 } },
      { text: "Guardare documentari su altri paesi", points: { TURISMO: 3 } },
      { text: "Fare lunghe passeggiate all'aperto", points: { AGRARIA: 3 } },
      { text: "Smontare e rimontare piccoli oggetti", points: { ELETTRONICA: 3, COSTRUZIONI: 2 } },
      { text: "Stare in compagnia e preparare qualcosa di buono", points: { PROFESSIONALE: 3 } }
    ]
  },
  {
    id: 4,
    text: "Qual è la tua materia preferita (o quella che ti incuriosisce di più)?",
    options: [
      { text: "Matematica o Economia", points: { ECONOMICO: 3 } },
      { text: "Lingue Straniere", points: { TURISMO: 3 } },
      { text: "Disegno Tecnico", points: { COSTRUZIONI: 3, ELETTRONICA: 2 } },
      { text: "Scienze o Biologia", points: { AGRARIA: 3 } },
      { text: "Attività pratiche e creative", points: { PROFESSIONALE: 3 } }
    ]
  }
];

const RESULTS_MAP: Record<Category, { title: string, icon: React.ReactNode }> = {
  ECONOMICO: { title: "Percorso Economico & Informatico", icon: <Laptop className="text-sky-500" /> },
  TURISMO: { title: "Percorso Turistico & Linguistico", icon: <Book className="text-blue-500" /> },
  COSTRUZIONI: { title: "Percorso Costruzioni (CAT)", icon: <Construction className="text-orange-500" /> },
  AGRARIA: { title: "Percorso Agrario & Ambientale", icon: <Leaf className="text-emerald-500" /> },
  ELETTRONICA: { title: "Percorso Elettronico (Automazione)", icon: <Zap className="text-amber-500" /> },
  PROFESSIONALE: { title: "Percorso Professionale (Alberghiero/Sociale)", icon: <Coffee className="text-rose-500" /> }
};

export const OrientationQuiz: React.FC<QuizProps> = ({ onClose, onComplete, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<Category, number>>({
    ECONOMICO: 0,
    TURISMO: 0,
    COSTRUZIONI: 0,
    AGRARIA: 0,
    ELETTRONICA: 0,
    PROFESSIONALE: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<{ title: string, icon: React.ReactNode } | null>(null);

  const handleOptionSelect = (points: Partial<Record<Category, number>>) => {
    const newScores = { ...scores };
    (Object.keys(points) as Category[]).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + (points[key] || 0);
    });
    setScores(newScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<Category, number>) => {
    let maxScore = -1;
    let winningCategory: Category = 'ECONOMICO';

    (Object.keys(finalScores) as Category[]).forEach((key) => {
      if (finalScores[key] > maxScore) {
        maxScore = finalScores[key];
        winningCategory = key;
      }
    });

    setCalculatedResult(RESULTS_MAP[winningCategory]);
    setShowResult(true);
  };

  if (showResult && calculatedResult) {
    return (
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl animate-fade-in overflow-hidden border border-slate-100">
        <div className="p-8 text-center bg-sky-50 border-b border-sky-100">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-white shadow-sm">
             {calculatedResult.icon}
          </div>
          <h2 className="text-2xl font-lexend font-bold text-slate-800">Risultato del Test</h2>
          <p className="text-slate-500 text-sm mt-1">Ecco il percorso più adatto alle tue passioni!</p>
        </div>
        
        <div className="p-8 text-center space-y-8">
           <div className="space-y-2">
             <p className="text-[10px] font-lexend font-bold uppercase tracking-widest text-slate-400">Indirizzo consigliato:</p>
             <h3 className="text-2xl font-lexend font-bold text-sky-600 leading-tight">
               {calculatedResult.title}
             </h3>
           </div>

           <div className="flex flex-col gap-3">
             <button 
                onClick={() => onComplete(calculatedResult.title)}
                className="w-full py-4 bg-sky-600 text-white rounded-2xl font-lexend font-bold shadow-lg shadow-sky-100 hover:bg-sky-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
             >
               Scopri di più <ArrowRight size={18} />
             </button>
             <button 
                onClick={onClose}
                className="w-full py-4 bg-white text-slate-500 rounded-2xl font-lexend font-bold border border-slate-100 hover:bg-slate-50 transition-all"
             >
               Chiudi
             </button>
           </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl animate-fade-in overflow-hidden border border-slate-100">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-sky-500" />
            <h3 className="font-lexend font-bold text-slate-800 text-sm">Trova il tuo indirizzo</h3>
         </div>
         <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
           <X size={20} />
         </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-50">
         <div className="h-full bg-sky-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Content */}
      <div className="p-8 min-h-[400px] flex flex-col justify-center">
         <div className="mb-2 text-[10px] font-lexend font-bold text-sky-500 uppercase tracking-widest text-center">
             Domanda {currentStep + 1} di {QUESTIONS.length}
         </div>
         <h2 className="text-xl md:text-2xl font-lexend font-bold text-center text-slate-800 mb-10 leading-snug">
           {currentQuestion.text}
         </h2>

         <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.points)}
                className="w-full text-left p-4 border border-slate-100 bg-slate-50 rounded-2xl transition-all duration-200 hover:bg-white hover:border-sky-300 hover:shadow-md group"
              >
                <span className="font-lexend font-semibold text-slate-600 group-hover:text-slate-800 text-sm md:text-base">{option.text}</span>
              </button>
            ))}
         </div>
      </div>
    </div>
  );
};