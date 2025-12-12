import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-black">
      {/* Background Image - Adore Church Style (Worship/Warmth) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920&auto=format&fit=crop")',
        }}
      >
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pb-20">
        
        {/* Decorative Line */}
        <div className="w-1 bg-hope-primary h-16 mb-6 animate-fade-in-up"></div>

        <span className="font-sans text-hope-primary uppercase tracking-[0.3em] mb-6 font-bold text-sm md:text-base animate-fade-in-up">
          Welcome to Hope Chapel
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight max-w-5xl animate-fade-in-up delay-100 shadow-sm">
          Experience God's <br/>
          <span className="italic text-hope-primary">Amazing Grace</span>
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl animate-fade-in-up delay-200 leading-relaxed">
          We are a community in Kahawa Wendani dedicated to worship, discipleship, and serving our neighbors with love.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
          <button 
            onClick={() => onNavigate(Page.EVENTS)}
            className="bg-hope-primary hover:bg-white hover:text-hope-secondary text-white px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
          >
            I'm New Here
          </button>
          <button 
            onClick={() => onNavigate(Page.SERMONS)}
            className="group bg-transparent border-2 border-white hover:bg-white hover:text-hope-secondary text-white px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
          >
            <Play size={16} className="fill-current" /> Watch Sermons
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;