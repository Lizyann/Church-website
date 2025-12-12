import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, PlayCircle, ArrowRight } from 'lucide-react';
import { Event, Sermon, Page } from '../types';

interface FeaturesProps {
  upcomingEvents: Event[];
  latestSermons: Sermon[];
  onNavigate: (page: Page) => void;
  onSermonSelect: (id: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ upcomingEvents, latestSermons, onNavigate, onSermonSelect }) => {
  const [timeLeft, setTimeLeft] = useState<{days: string, hours: string, minutes: string, seconds: string}>({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Find next Sunday
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      nextSunday.setHours(10, 0, 0, 0);

      // If today is Sunday and it's past 10am, set to next week
      if (now.getDay() === 0 && now > nextSunday) {
        nextSunday.setDate(nextSunday.getDate() + 7);
      }
      // If it's currently not sunday but calculation set it to today (e.g. earlier today), move to next sunday
      if (nextSunday < now) {
          nextSunday.setDate(nextSunday.getDate() + 7);
      }

      const diff = nextSunday.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        
        {/* Next Event Timer - Overlapping Hero */}
        <div className="relative z-20 -mt-20 mb-24">
          <div className="bg-hope-primary text-white p-8 md:p-10 rounded-none shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">
            <div className="text-center lg:text-left">
              <h3 className="uppercase font-bold tracking-widest text-xs md:text-sm mb-3 text-white/80">Join Us This Sunday</h3>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Sunday Worship</h2>
              <p className="text-white/90 flex items-center justify-center lg:justify-start gap-2 text-sm md:text-base">
                 <Clock size={16} /> 10:00 AM • Main Sanctuary
              </p>
            </div>

            <div className="flex gap-4 md:gap-6">
               {Object.entries(timeLeft).map(([unit, val]) => (
                 <div key={unit} className="flex flex-col items-center">
                   <div className="text-4xl md:text-5xl font-bold font-serif leading-none mb-1">
                     {val}
                   </div>
                   <span className="text-[10px] uppercase tracking-widest text-white/70">
                     {unit}
                   </span>
                 </div>
               ))}
            </div>
            
            <button 
              onClick={() => onNavigate(Page.EVENTS)}
              className="bg-hope-secondary hover:bg-gray-900 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-lg hidden lg:block"
            >
              Event Details
            </button>
          </div>
        </div>

        {/* Latest Sermons Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-hope-primary font-bold uppercase tracking-widest text-sm">Spiritual Growth</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-3 mb-4">Latest Sermons</h2>
            <div className="w-16 h-1 bg-hope-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestSermons.map((sermon) => (
              <div 
                key={sermon.id} 
                onClick={() => onSermonSelect(sermon.id)}
                className="group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={sermon.imageUrl} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-hope-primary shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircle size={32} fill="currentColor" className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-hope-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
                    {sermon.date}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2 group-hover:text-hope-primary transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">By {sermon.preacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome / About Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
           <div>
             <span className="text-hope-primary font-bold uppercase tracking-widest text-sm">Welcome to Hope Chapel</span>
             <h2 className="text-4xl font-serif font-bold text-gray-900 mt-4 mb-6 leading-tight">
               Connecting People to God and to One Another
             </h2>
             <p className="text-gray-600 leading-relaxed mb-6 text-lg">
               We believe that church is more than a service on the weekend. It’s about connecting with others, growing in your faith, and building a strong foundation for your family.
             </p>
             <div className="space-y-4 mb-8">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-hope-primary/10 flex items-center justify-center text-hope-primary shrink-0">
                   <Calendar size={24} />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-lg">Biblical Teaching</h4>
                   <p className="text-sm text-gray-500">Grounded in the Word of God.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-hope-primary/10 flex items-center justify-center text-hope-primary shrink-0">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-lg">Community Focused</h4>
                   <p className="text-sm text-gray-500">Serving Kahawa Wendani with love.</p>
                 </div>
               </div>
             </div>
             <button 
              onClick={() => onNavigate(Page.ABOUT)}
              className="flex items-center gap-2 text-hope-secondary font-bold uppercase tracking-wider text-sm hover:text-hope-primary transition-colors group"
             >
               More About Us <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
             </button>
           </div>
           
           <div className="relative pl-8 pb-8">
             <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-hope-primary/10 -z-10 rounded-tl-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop" 
               alt="Community" 
               className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
             />
             <div className="absolute bottom-10 -left-6 bg-white p-6 shadow-xl rounded-lg max-w-xs hidden md:block border-l-4 border-hope-primary">
               <p className="font-serif italic text-gray-600">"A place where you can belong, believe, and become."</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Features;