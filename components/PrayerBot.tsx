import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const PrayerBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Blessings! I'm Hope Guide, your virtual ministry assistant. How can I pray for you or help you today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent background scrolling when chat is open on mobile
  useEffect(() => {
    if (window.innerWidth < 640 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-hope-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Prayer Assistant"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed z-50 bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out
          ${isOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none translate-y-full sm:translate-y-10'
          }
          
          /* Mobile: Full screen configuration */
          inset-0 h-[100dvh] w-full rounded-none
          
          /* Desktop: Widget configuration (overrides mobile) */
          sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:rounded-2xl
        `}
      >
        {/* Header */}
        <div className="bg-hope-secondary p-4 flex items-center justify-between sm:rounded-t-2xl shrink-0 safe-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-hope-primary" />
            </div>
            <div>
              <h3 className="font-bold text-white font-serif">Hope Guide</h3>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full block"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Chat"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scroll-smooth">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-hope-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-hope-primary" />
                <span className="text-xs text-gray-500">Writing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0 pb-[env(safe-area-inset-bottom,20px)]">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-hope-primary transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for prayer or guidance..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 min-h-[24px]"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-hope-primary hover:text-hope-secondary disabled:opacity-50 transition-colors p-1"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            AI can make mistakes. For serious counseling, please contact the church office.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrayerBot;