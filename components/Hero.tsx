import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay - Using a warm worship style image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920&auto=format&fit=crop")', 
        }}
      >
         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 mix-blend-multiply"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-20">
        <span className="font-sans text-hope-primary uppercase tracking-[0.2em] mb-4 font-bold text-sm md:text-base animate-fade-in-up">
          Welcome Home
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl animate-fade-in-up delay-100">
          A Place of <span className="text-hope-primary italic">Grace</span> & <br/>
          New Beginnings
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl animate-fade-in-up delay-200">
          Join us this Sunday at Hope Chapel, Kahawa Wendani. We are a community dedicated to faith, hope, and love.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
          <button 
            onClick={() => onNavigate(Page.EVENTS)}
            className="bg-hope-primary hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            Plan Your Visit <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => onNavigate(Page.SERMONS)}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-hope-secondary text-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Watch Online
          </button>
        </div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-none">
         <svg className="w-full h-12 md:h-24 text-white fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
      </div>
    </div>
  );
};

export default Hero;