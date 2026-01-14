import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { OrientationQuiz } from './components/OrientationQuiz';
import { HomePage } from './components/HomePage';
import { PrivacyModal } from './components/PrivacyModal';
import { StageBookingModal } from './components/StageBookingModal';
import { Moon, Sun, HelpCircle, Lightbulb, X, Send, Sparkles, Scroll, Feather, Info, MapPin, Compass, MessageCircle, Leaf, Users } from 'lucide-react';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [autoQuestion, setAutoQuestion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  useEffect(() => {
    const hasAcceptedPrivacy = localStorage.getItem('romagnosi_privacy_accepted');
    if (!hasAcceptedPrivacy) {
      setShowPrivacy(true);
    }
  }, []);

  const handleAcceptPrivacy = () => {
    localStorage.setItem('romagnosi_privacy_accepted', 'true');
    setShowPrivacy(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const faqItems = [
    { icon: "🍃", text: "Quali sono i corsi principali?" },
    { icon: "📅", text: "Giorni di vacanza e festività" },
    { icon: "🚀", text: "Cosa posso fare dopo il diploma?" },
    { icon: "👩‍🏫", text: "Com'è il rapporto con i prof?" },
    { icon: "💻", text: "Parlami dei laboratori informatici" },
    { icon: "✈️", text: "Posso fare stage all'estero?" },
  ];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
      setIsFeedbackOpen(false);
    }, 2000);
  };

  const handleFaqClick = (question: string) => {
    setAutoQuestion(question);
    setIsSidebarOpen(false);
  };

  const handleQuizComplete = (result: string) => {
    setIsQuizOpen(false);
    setIsSidebarOpen(false);
    handleFaqClick(`Ho fatto il test di orientamento e il mio profilo ideale è: "${result}". Mi spieghi meglio cosa si studia in questo indirizzo?`);
  };

  return (
    <div className="h-[100dvh] w-screen flex overflow-hidden relative bg-emerald-50/20">
      
      {showLanding ? (
        <HomePage 
          onStart={() => setShowLanding(false)} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
        />
      ) : (
        <>
          {/* Mobile Sidebar Backdrop */}
          {isSidebarOpen && (
            <div 
                className="fixed inset-0 z-40 bg-emerald-900/10 backdrop-blur-sm md:hidden animate-fade-in"
                onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Navigation */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-500 ease-in-out
            md:relative md:translate-x-0 md:z-auto shadow-xl md:shadow-none
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            bg-white border-r border-emerald-100
          `}>
            {/* Sidebar Header */}
            <div className="p-6 pb-2 flex justify-between items-start">
              <div className="cursor-pointer" onClick={() => setShowLanding(true)}>
                <div className="bg-emerald-50 p-3 rounded-2xl inline-block mb-3">
                  <img 
                    src="https://20.gdromagnosi.it/img/xtra/logo.png" 
                    alt="Logo Romagnosi" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <h1 className="font-lexend text-xl font-bold text-slate-800">
                  Orientamento
                </h1>
                <p className="text-[10px] font-lexend font-medium uppercase tracking-wider text-emerald-600">Sostenibilità & Talento</p>
              </div>
              
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-2 text-slate-400 hover:text-emerald-600"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Scrollable Middle Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-6">
                <div className="p-4 rounded-2xl mb-6 bg-emerald-50/50 border border-emerald-100 text-slate-600">
                    <div className="flex items-start gap-3">
                        <Leaf size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">"Ciao! Sono il tuo tutor digitale. Scopriamo insieme il tuo futuro all'ISIS Romagnosi!"</span>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="space-y-3 mb-8">
                  <button 
                      onClick={() => setIsQuizOpen(true)}
                      className="w-full group p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-emerald-200 transition-all flex items-center justify-between shadow-sm hover:shadow-md"
                  >
                      <div className="text-left">
                          <p className="font-lexend font-bold text-slate-800">Trova la tua strada</p>
                          <p className="text-xs text-slate-500">Fai il test veloce</p>
                      </div>
                      <div className="bg-emerald-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                        <Compass size={20} />
                      </div>
                  </button>

                  <button 
                      onClick={() => setIsStageModalOpen(true)}
                      className="w-full group p-4 bg-emerald-600 text-white border-2 border-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-between shadow-md"
                  >
                      <div className="text-left">
                          <p className="font-lexend font-bold">Vieni a trovarci</p>
                          <p className="text-xs opacity-80">Studente per un giorno</p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                        <Users size={20} />
                      </div>
                  </button>
                </div>

                {/* FAQ Section */}
                <div className="mb-6">
                    <h3 className="text-[10px] font-lexend font-bold uppercase tracking-widest mb-4 text-slate-400 px-1">
                        Domande frequenti
                    </h3>
                    <div className="space-y-1">
                        {faqItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleFaqClick(item.text)}
                                className="w-full text-left p-3 text-sm rounded-xl transition-all flex items-center gap-3 group hover:bg-emerald-50 text-slate-600 hover:text-emerald-700"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="p-4 space-y-3 bg-emerald-50/30 border-t border-emerald-100">
              <button 
                 onClick={() => setIsFeedbackOpen(true)}
                 className="w-full flex items-center justify-center gap-2 p-3 text-sm font-lexend font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                  <MessageCircle size={16} />
                  Dacci un feedback
              </button>

              <div className="flex justify-between items-center px-2 pt-2 opacity-60">
                  <div className="flex items-center gap-2 text-[10px] font-lexend font-bold text-slate-400">
                     <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                     Tutor Online
                  </div>
                  <span className="text-[10px] font-lexend font-bold text-slate-400">Ver. 2025.Eco</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 h-full relative z-10 flex flex-col overflow-hidden bg-white">
             <ChatInterface 
               isDarkMode={isDarkMode} 
               externalMessage={autoQuestion}
               onExternalMessageHandled={() => setAutoQuestion(null)}
               onToggleSidebar={() => setIsSidebarOpen(true)}
             />
          </main>

          {/* Quiz Modal */}
          {isQuizOpen && (
             <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-sm animate-fade-in">
                 <OrientationQuiz 
                    onClose={() => setIsQuizOpen(false)}
                    onComplete={handleQuizComplete}
                    isDarkMode={isDarkMode}
                 />
             </div>
          )}

          {/* Stage Booking Modal */}
          {isStageModalOpen && (
             <StageBookingModal onClose={() => setIsStageModalOpen(false)} />
          )}

          {/* Privacy Modal */}
          {showPrivacy && (
            <PrivacyModal onAccept={handleAcceptPrivacy} />
          )}

          {/* Feedback Modal */}
          {isFeedbackOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-emerald-950/20 backdrop-blur-sm animate-fade-in">
               <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-50">
                  <div className="p-8 relative">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="font-lexend text-xl font-bold text-slate-800 flex items-center gap-2">
                            Il tuo parere conta
                          </h3>
                          <button onClick={() => setIsFeedbackOpen(false)} className="text-slate-400 hover:text-emerald-600 transition-colors">
                              <X size={24} />
                          </button>
                      </div>
                      
                      {feedbackSent ? (
                          <div className="text-center py-10 animate-fade-in">
                              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={32} />
                              </div>
                              <h4 className="font-lexend text-xl font-bold text-slate-800">Grazie!</h4>
                              <p className="text-slate-500 mt-2">Ogni suggerimento ci aiuta a crescere.</p>
                          </div>
                      ) : (
                          <form onSubmit={handleSendFeedback} className="space-y-6">
                              <textarea 
                                  required
                                  value={feedbackText}
                                  onChange={(e) => setFeedbackText(e.target.value)}
                                  className="w-full h-32 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all text-slate-700"
                                  placeholder="Come possiamo migliorare questo tutor?"
                              />
                              <button 
                                  type="submit"
                                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-lexend font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                              >
                                  Invia Suggerimento
                              </button>
                          </form>
                      )}
                  </div>
               </div>
            </div>
          )}
        </>
      )}
      
    </div>
  );
};

export default App;
