import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Trophy, Info, Leaf } from 'lucide-react';

interface SolitaireGameProps {
  onClose: () => void;
}

type Card = {
  suit: '🍀' | '🌿' | '🍃' | '🌱';
  rank: string;
  value: number;
  color: 'red' | 'black';
  isFaceUp: boolean;
};

const SUITS: Card['suit'][] = ['🍀', '🌿', '🍃', '🌱'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const SolitaireGame: React.FC<SolitaireGameProps> = ({ onClose }) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [piles, setPiles] = useState<Card[][]>([[], [], [], []]);
  const [message, setMessage] = useState('Ordina i semi per vincere!');
  const [score, setScore] = useState(0);

  const createDeck = () => {
    const newDeck: Card[] = [];
    SUITS.forEach((suit, sIdx) => {
      RANKS.forEach((rank, rIdx) => {
        newDeck.push({
          suit,
          rank,
          value: rIdx + 1,
          color: sIdx < 2 ? 'black' : 'red',
          isFaceUp: false,
        });
      });
    });
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const initGame = () => {
    const d = createDeck();
    setDeck(d);
    setPiles([[], [], [], []]);
    setScore(0);
    setMessage('Abbina le carte in ordine!');
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (card: Card, deckIndex: number) => {
    // Simplified Solitaire logic: Move next card to its foundation pile if it's the next in sequence
    const pileIdx = SUITS.indexOf(card.suit);
    const targetPile = piles[pileIdx];
    const expectedValue = targetPile.length + 1;

    if (card.value === expectedValue) {
      const newPiles = [...piles];
      newPiles[pileIdx] = [...targetPile, { ...card, isFaceUp: true }];
      setPiles(newPiles);
      
      const newDeck = [...deck];
      newDeck.splice(deckIndex, 1);
      setDeck(newDeck);
      
      setScore(prev => prev + 10);
      if (newDeck.length === 0) setMessage('Vittoria Ecologica! 🏆');
    } else {
      setMessage(`Serve un ${expectedValue} di ${card.suit}!`);
      setTimeout(() => setMessage('Continua a cercare...'), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#064e3b] rounded-[3rem] shadow-2xl overflow-hidden border-8 border-[#047857] animate-zoom-in relative flex flex-col h-[80vh]">
      {/* Header */}
      <div className="p-6 bg-[#065f46] flex justify-between items-center border-b border-emerald-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-xl text-white">
            <Leaf size={20} />
          </div>
          <h3 className="font-lexend font-bold text-white uppercase tracking-widest text-sm">Eco Solitaire</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-emerald-900/50 px-4 py-1 rounded-full border border-emerald-700">
            <span className="text-emerald-300 text-xs font-bold mr-2">PUNTI:</span>
            <span className="text-white font-black">{score}</span>
          </div>
          <button onClick={onClose} className="text-emerald-300 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {/* Foundations */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {SUITS.map((suit, i) => (
            <div key={i} className="relative group">
               <div className="aspect-[2/3] rounded-2xl border-4 border-dashed border-emerald-800/50 flex flex-col items-center justify-center bg-emerald-900/20">
                  <span className="text-4xl opacity-20 grayscale">{suit}</span>
                  {piles[i].length > 0 && (
                    <div className="absolute inset-0 bg-white rounded-xl flex flex-col items-center justify-center shadow-xl border-2 border-emerald-100 animate-fade-in">
                       <span className="text-xs absolute top-2 left-2">{piles[i][piles[i].length-1].suit}</span>
                       <span className="text-3xl font-black text-slate-800">{piles[i][piles[i].length-1].rank}</span>
                       <span className="text-xs absolute bottom-2 right-2">{piles[i][piles[i].length-1].suit}</span>
                    </div>
                  )}
               </div>
               <div className="mt-2 text-center text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Pila {suit}</div>
            </div>
          ))}
        </div>

        {/* Deck area */}
        <div className="bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-800/30">
          <div className="flex justify-between items-center mb-6">
             <p className="text-emerald-100 font-lexend font-bold text-sm">{message}</p>
             <button onClick={initGame} className="p-2 bg-emerald-700 hover:bg-emerald-600 rounded-full text-white transition-all shadow-lg">
                <RotateCcw size={18} />
             </button>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {deck.slice(0, 12).map((card, idx) => (
              <button 
                key={idx}
                onClick={() => handleCardClick(card, idx)}
                className="w-16 h-24 bg-white rounded-xl shadow-lg border-2 border-emerald-50 hover:-translate-y-2 hover:shadow-emerald-900/20 transition-all flex flex-col items-center justify-center group active:scale-90"
              >
                <span className="text-[10px] self-start ml-1 mt-0.5 group-hover:scale-110 transition-transform">{card.suit}</span>
                <span className="flex-1 flex items-center font-black text-lg text-slate-800">{card.rank}</span>
                <span className="text-[10px] self-end mr-1 mb-0.5 group-hover:scale-110 transition-transform">{card.suit}</span>
              </button>
            ))}
            {deck.length > 12 && (
              <div className="w-16 h-24 bg-emerald-800 rounded-xl border-2 border-emerald-600 flex items-center justify-center text-emerald-400 font-bold text-xs text-center px-1">
                +{deck.length - 12} CARTE
              </div>
            )}
            {deck.length === 0 && piles.every(p => p.length === 0) && (
               <div className="py-12 text-center">
                  <p className="text-emerald-400 font-lexend text-sm">Mazzo vuoto. Clicca reset per rigiocare!</p>
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#064e3b] text-center border-t border-emerald-800">
          <p className="text-[10px] text-emerald-500 font-lexend font-bold uppercase tracking-[0.2em]">
            Tip: Clicca le carte nel mazzo per impilarle nelle basi in ordine (A -> K)
          </p>
      </div>
    </div>
  );
};