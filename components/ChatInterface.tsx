import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, Sparkles, Volume2, StopCircle, Mic, Image as ImageIcon, X, Info, Menu, Leaf } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";
import { createSchoolChat, generateSpeech } from '../services/geminiService';
import { Message, Role } from '../types';

interface ChatInterfaceProps {
  isDarkMode: boolean;
  externalMessage?: string | null;
  onExternalMessageHandled?: () => void;
  onToggleSidebar?: () => void;
}

type AvatarState = 'idle' | 'thinking' | 'speaking';

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isDarkMode, 
  externalMessage, 
  onExternalMessageHandled,
  onToggleSidebar 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const suggestionChips = [
    { text: "Che corsi ci sono?" },
    { text: "Parlami dei progetti Green" },
    { text: "Cosa si fa nei laboratori?" },
    { text: "Dove si trova la scuola?" }
  ];

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createSchoolChat();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalMessage) {
      handleSendMessage(externalMessage);
      if (onExternalMessageHandled) onExternalMessageHandled();
    }
  }, [externalMessage]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !chatSessionRef.current || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setAvatarState('thinking');

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage(text);
      const responseText = result.text;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: responseText,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: "Ops! Qualcosa è andato storto nella connessione. Riprova tra un momento! 🌱",
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setAvatarState('idle');
    }
  };

  const handleSpeak = async (text: string) => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    setAvatarState('speaking');
    setIsPlayingAudio(true);

    try {
      const base64Audio = await generateSpeech(text);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setIsPlayingAudio(false);
        setAvatarState('idle');
      };

      source.start(0);
      currentSourceRef.current = source;

    } catch (err) {
      console.error("TTS Error", err);
      setIsPlayingAudio(false);
      setAvatarState('idle');
    }
  };

  const stopAudio = () => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    setIsPlayingAudio(false);
    setAvatarState('idle');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      
      {/* Header */}
      <div className="z-20 px-4 py-4 flex items-center justify-between border-b border-emerald-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="md:hidden p-2 text-slate-500 hover:bg-emerald-50 rounded-xl">
             <Menu size={24} />
          </button>
          
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
               avatarState !== 'idle' ? 'border-emerald-400 scale-105' : 'border-slate-100'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Bot Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
               avatarState === 'idle' ? 'bg-emerald-400' : 'bg-emerald-500 animate-pulse'
            }`}></div>
          </div>

          <div>
            <h2 className="font-lexend font-bold text-slate-800">Tutor Romagnosi</h2>
            <p className="text-[10px] font-lexend font-bold text-emerald-600 uppercase tracking-widest">
              {avatarState === 'thinking' ? 'Sto analizzando...' : (avatarState === 'speaking' ? 'Ti sto parlando...' : 'Sostenibile & Futuro')}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:px-12 space-y-6">
        
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-fade-in">
            <div className="space-y-4 max-w-sm">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                   <Leaf size={32} />
                </div>
                <h3 className="text-2xl font-lexend font-bold text-slate-800">Ciao! Di cosa parliamo?</h3>
                <p className="text-slate-500 text-sm">
                  Sono qui per guidarti alla scoperta della nostra scuola. Scegli un argomento o scrivimi le tue curiosità!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
               {suggestionChips.map((chip, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSendMessage(chip.text)}
                   className="px-6 py-4 text-sm font-lexend font-semibold text-slate-600 bg-emerald-50/30 border border-emerald-100 rounded-2xl transition-all hover:bg-white hover:border-emerald-200 hover:shadow-md text-left flex items-center justify-between group"
                 >
                   {chip.text}
                   <ArrowRight size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-all" />
                 </button>
               ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === Role.USER;
          return (
            <div 
              key={msg.id} 
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 border shadow-sm ${
                  isUser ? 'bg-white text-emerald-600 border-emerald-100' : 'bg-emerald-600 text-white border-emerald-600'
                }`}>
                  {isUser ? <User size={16} /> : <Leaf size={16} />}
                </div>

                <div className={`p-4 md:p-5 rounded-3xl text-sm md:text-base font-medium leading-relaxed ${
                  isUser 
                    ? 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tr-none' 
                    : 'bg-emerald-50/50 text-slate-800 rounded-tl-none border border-emerald-50'
                }`}>
                  {msg.text}
                  
                  {!isUser && !msg.isError && (
                    <div className="mt-4 pt-3 border-t border-emerald-100/50 flex justify-start">
                      <button 
                         onClick={() => isPlayingAudio ? stopAudio() : handleSpeak(msg.text)}
                         className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                           isPlayingAudio 
                             ? 'bg-emerald-100 text-emerald-600 animate-pulse' 
                             : 'text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                           }
                         `}
                      >
                         {isPlayingAudio ? <StopCircle size={14} /> : <Volume2 size={14} />}
                         {isPlayingAudio ? 'Ferma' : 'Ascolta'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start animate-fade-in pl-10">
             <div className="bg-emerald-50/30 p-4 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
             </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 md:p-6 bg-white border-t border-emerald-50">
        <div className="max-w-4xl mx-auto flex items-center gap-2 p-2 bg-emerald-50/30 border border-emerald-100 rounded-[2rem] focus-within:ring-2 focus-within:ring-emerald-200 focus-within:bg-white transition-all shadow-sm">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Chiedimi della scuola..."
            rows={1}
            className="w-full bg-transparent px-4 py-3 min-h-[50px] max-h-[120px] resize-none outline-none text-base font-medium text-slate-700 placeholder:text-slate-400"
          />

          <button 
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleSendMessage(inputText)}
            className={`p-3 rounded-2xl transition-all ${
               !inputText.trim() 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100 hover:scale-105 active:scale-95'
               }
            `}
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);