import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, PlayCircle } from 'lucide-react';
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
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Next Event Timer / Banner */}
        <div className="bg-hope-secondary text-white rounded-2xl p-8 md:p-12 -mt-32 relative z-10 shadow-xl mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-hope-primary uppercase font-bold tracking-widest text-sm mb-2">Next Service</h3>
            <h2 className="font-serif text-3xl font-bold">Sunday Worship Service</h2>
            <div className="flex items-center gap-4 mt-4 text-gray-300 justify-center md:justify-start">
               <span className="flex items-center gap-2"><Clock size={16} /> 10:00 AM</span>
               <span className="flex items-center gap-2"><MapPin size={16} /> Main Sanctuary</span>
            </div>
          </div>
          <div className="flex gap-4">
             {Object.entries(timeLeft).map(([unit, val]) => (
               <div key={unit} className="flex flex-col items-center">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold font-serif mb-1 backdrop-blur-sm shadow-inner border border-white/5">
                   {val}
                 </div>
                 <span className="text-[10px] md:text-xs uppercase text-gray-400 tracking-wider">
                   {unit}
                 </span>
               </div>
             ))}
          </div>
        </div>

        {/* Latest Sermons */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-hope-primary font-bold uppercase tracking-widest">Inspiration</span>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mt-2">Latest Sermons</h2>
            <div className="w-24 h-1 bg-hope-primary mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestSermons.map((sermon) => (
              <div 
                key={sermon.id} 
                onClick={() => onSermonSelect(sermon.id)}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={sermon.imageUrl} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle size={48} className="text-white transform scale-90 group-hover:scale-100 transition-transform" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    <Calendar size={12} /> {sermon.date}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-800 mb-2 group-hover:text-hope-primary transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">By {sermon.preacher}</p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {sermon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => onNavigate(Page.SERMONS)}
              className="inline-block border-2 border-hope-secondary text-hope-secondary px-8 py-3 rounded-full font-bold hover:bg-hope-secondary hover:text-white transition-colors"
            >
              View All Sermons
            </button>
          </div>
        </div>

        {/* Ministries / About Preview */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="relative">
             <div className="absolute top-4 left-4 w-full h-full border-4 border-hope-primary rounded-xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=600&auto=format&fit=crop" 
               alt="Community" 
               className="relative rounded-xl shadow-lg z-10 w-full object-cover h-[400px]"
             />
           </div>
           <div>
             <span className="text-hope-primary font-bold uppercase tracking-widest">Who We Are</span>
             <h2 className="text-4xl font-serif font-bold text-gray-800 mt-2 mb-6">A Community of Faith in Kahawa Wendani</h2>
             <p className="text-gray-600 leading-relaxed mb-6">
               Hope Chapel is more than just a building; it's a family. Located in the heart of Kahawa Wendani, we are dedicated to serving our community, spreading the Gospel, and providing a home for everyone who seeks God's grace.
             </p>
             <ul className="space-y-4 mb-8">
               {['Biblical Teaching', 'Vibrant Worship', 'Community Outreach', 'Youth & Kids Ministry'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-hope-primary rounded-full"></div>
                   <span className="font-serif text-lg text-gray-800">{item}</span>
                 </li>
               ))}
             </ul>
             <button 
              onClick={() => onNavigate(Page.ABOUT)}
              className="text-hope-primary font-bold border-b-2 border-hope-primary pb-1 hover:text-hope-secondary hover:border-hope-secondary transition-colors"
             >
               Read Our History
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Features;