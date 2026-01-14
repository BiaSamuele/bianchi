import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, Play, Hand, Plus, Leaf } from 'lucide-react';

interface BlackjackGameProps {
  onClose: () => void;
}

type Card = {
  suit: string;
  rank: string;
  value: number;
};

const SUITS = ['🍀', '🌿', '🍃', '🌱'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const BlackjackGame: React.FC<BlackjackGameProps> = ({ onClose }) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<'dealing' | 'playing' | 'dealerTurn' | 'gameOver'>('dealing');
  const [message, setMessage] = useState('Pronto per una sfida eco?');

  const createDeck = () => {
    const newDeck: Card[] = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        let value = parseInt(rank);
        if (rank === 'A') value = 11;
        else if (['J', 'Q', 'K'].includes(rank)) value = 10;
        newDeck.push({ suit, rank, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const calculateScore = (hand: Card[]) => {
    let score = hand.reduce((acc, card) => acc + card.value, 0);
    let aces = hand.filter(card => card.rank === 'A').length;
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  };

  const startNewGame = () => {
    const newDeck = createDeck();
    const p1 = newDeck.pop()!;
    const d1 = newDeck.pop()!;
    const p2 = newDeck.pop()!;
    const d2 = newDeck.pop()!;

    setDeck(newDeck);
    setPlayerHand([p1, p2]);
    setDealerHand([d1, d2]);
    setGameState('playing');
    setMessage('Tocca a te!');
  };

  const hit = () => {
    if (gameState !== 'playing') return;
    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newHand = [...playerHand, newCard];
    
    setDeck(newDeck);
    setPlayerHand(newHand);

    if (calculateScore(newHand) > 21) {
      setGameState('gameOver');
      setMessage('Hai sballato! 🍂');
    }
  };

  const stand = useCallback(() => {
    if (gameState !== 'playing') return;
    setGameState('dealerTurn');
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const dScore = calculateScore(dealerHand);
      if (dScore < 17) {
        setTimeout(() => {
          const newDeck = [...deck];
          const newCard = newDeck.pop()!;
          setDeck(newDeck);
          setDealerHand([...dealerHand, newCard]);
        }, 1000);
      } else {
        const pScore = calculateScore(playerHand);
        setGameState('gameOver');
        if (dScore > 21) setMessage('Il Dealer sballa! Hai vinto! 🌿');
        else if (pScore > dScore) setMessage('Hai vinto! Ottimo gioco! 🍀');
        else if (pScore < dScore) setMessage('Ha vinto il Dealer. Riprova! 🍃');
        else setMessage('Pareggio! 🤝');
      }
    }
  }, [dealerHand, gameState, playerHand, deck]);

  const pScore = calculateScore(playerHand);
  const dScore = calculateScore(dealerHand);

  return (
    <div className="w-full max-w-lg bg-[#1a472a] rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-emerald-800 animate-fade-in relative">
      {/* Table Header */}
      <div className="p-6 bg-emerald-900/50 flex justify-between items-center border-b border-emerald-800">
        <div className="flex items-center gap-3 text-emerald-100">
          <Leaf size={20} className="text-emerald-400" />
          <h3 className="font-lexend font-bold uppercase tracking-widest text-sm">Sustainable Blackjack</h3>
        </div>
        <button onClick={onClose} className="text-emerald-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="p-8 space-y-12">
        {/* Dealer Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-lexend font-bold text-emerald-400 uppercase tracking-[0.2em]">Dealer</span>
            <span className="text-emerald-100 font-bold bg-emerald-900/80 px-3 py-1 rounded-full text-xs">
              {gameState === 'playing' ? '?' : dScore}
            </span>
          </div>
          <div className="flex justify-center gap-3 min-h-[100px]">
            {dealerHand.map((card, i) => (
              <div key={i} className={`w-16 h-24 rounded-xl flex flex-col items-center justify-center font-bold text-xl transition-all duration-500 transform ${
                i === 1 && gameState === 'playing' ? 'bg-emerald-800 border-2 border-emerald-600' : 'bg-white text-slate-800 shadow-xl'
              }`}>
                {i === 1 && gameState === 'playing' ? (
                   <Leaf size={24} className="text-emerald-600/30" />
                ) : (
                  <>
                    <span className="text-xs self-start ml-2 mt-1">{card.suit}</span>
                    <span className="flex-1 flex items-center">{card.rank}</span>
                    <span className="text-xs self-end mr-2 mb-1">{card.suit}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center">
            <p className="font-lexend text-emerald-100 font-bold text-lg h-8 animate-pulse">{message}</p>
        </div>

        {/* Player Area */}
        <div className="space-y-4">
          <div className="flex justify-center gap-3 min-h-[100px]">
            {playerHand.map((card, i) => (
              <div key={i} className="w-16 h-24 bg-white rounded-xl flex flex-col items-center justify-center font-bold text-xl text-slate-800 shadow-xl animate-fade-in">
                <span className="text-xs self-start ml-2 mt-1">{card.suit}</span>
                <span className="flex-1 flex items-center">{card.rank}</span>
                <span className="text-xs self-end mr-2 mb-1">{card.suit}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-lexend font-bold text-emerald-400 uppercase tracking-[0.2em]">Il tuo punteggio</span>
            <span className="text-emerald-100 font-bold bg-emerald-900/80 px-3 py-1 rounded-full text-xs">
              {pScore}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 bg-emerald-900/30 border-t border-emerald-800">
        <div className="flex gap-4">
          {gameState === 'playing' ? (
            <>
              <button 
                onClick={hit}
                className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-lexend font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Carta
              </button>
              <button 
                onClick={stand}
                className="flex-1 py-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-2xl font-lexend font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Hand size={20} /> Stai
              </button>
            </>
          ) : (
            <button 
              onClick={startNewGame}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-lexend font-bold transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {gameState === 'gameOver' ? <RotateCcw size={20} /> : <Play size={20} />}
              {gameState === 'gameOver' ? 'Gioca ancora' : 'Inizia Partita'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};