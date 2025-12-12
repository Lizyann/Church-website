import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import PrayerBot from './components/PrayerBot';
import SermonDetail from './components/SermonDetail';
import About from './components/About';
import Contact from './components/Contact';
import Giving from './components/Giving';
import { Page, Sermon, Event } from './types';

// Mock Data with Video URLs
const LATEST_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    preacher: 'Pst. John Doe',
    date: 'Oct 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
    description: 'Discover how to maintain your faith during challenging times and trust in God\'s perfect plan for your life.',
    videoUrl: 'https://www.youtube.com/embed/S9r_54J7r9I' // Placeholder video
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    preacher: 'Rev. Jane Smith',
    date: 'Oct 08, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=800&auto=format&fit=crop',
    description: 'An in-depth look at how prayer changes things, not just the situation, but the one who prays.',
    videoUrl: 'https://www.youtube.com/embed/S9r_54J7r9I'
  },
  {
    id: '3',
    title: 'Community & Love',
    preacher: 'Pst. Michael Kamau',
    date: 'Oct 01, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop',
    description: 'Understanding the importance of biblical community and how we can serve one another in love.',
    videoUrl: 'https://www.youtube.com/embed/S9r_54J7r9I'
  }
];

const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Sunday Service',
    date: 'Oct 22, 2023',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);

  useEffect(() => {
    // Update document title based on page
    const baseTitle = "Hope Chapel - Kahawa Wendani";
    const pageTitles: Record<Page, string> = {
      [Page.HOME]: "Home",
      [Page.SERMONS]: "Sermons",
      [Page.SERMON_DETAIL]: "Sermon",
      [Page.EVENTS]: "Events",
      [Page.GIVING]: "Giving",
      [Page.ABOUT]: "About Us",
      [Page.CONTACT]: "Contact Us"
    };
    
    document.title = `${pageTitles[currentPage]} | ${baseTitle}`;
  }, [currentPage]);

  const handleSermonSelect = (id: string) => {
    setSelectedSermonId(id);
    setCurrentPage(Page.SERMON_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Features 
              upcomingEvents={UPCOMING_EVENTS} 
              latestSermons={LATEST_SERMONS} 
              onNavigate={handleNavigate}
              onSermonSelect={handleSermonSelect}
            />
            {/* Call to Action Section */}
            <div className="bg-hope-primary py-16">
              <div className="container mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                  "Come to me, all you who are weary..."
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Whether you are new to the area or looking for a spiritual home, we invite you to experience the love of God with us.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => handleNavigate(Page.ABOUT)}
                    className="bg-white text-hope-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Learn More About Us
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case Page.SERMON_DETAIL:
        const sermon = LATEST_SERMONS.find(s => s.id === selectedSermonId);
        if (!sermon) return <div>Sermon not found</div>;
        return <SermonDetail sermon={sermon} onNavigate={handleNavigate} />;
        
      case Page.SERMONS:
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
             <div className="container mx-auto px-4">
               <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8 text-center">Sermon Archive</h1>
               <div className="grid md:grid-cols-3 gap-8">
                  {LATEST_SERMONS.map(s => (
                     <div 
                      key={s.id} 
                      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleSermonSelect(s.id)}
                     >
                        <img src={s.imageUrl} className="w-full h-48 object-cover rounded-lg mb-4"/>
                        <h3 className="font-bold text-xl">{s.title}</h3>
                        <p className="text-sm text-gray-500">{s.preacher}</p>
                     </div>
                  ))}
                  {/* Mock content filler */}
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-xl shadow p-4 opacity-75">
                       <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                       <h3 className="font-bold text-xl text-gray-400">Previous Message {i}</h3>
                       <p className="text-sm text-gray-400">Archive</p>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        );
      case Page.EVENTS:
        return (
          <div className="pt-24 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8 text-center">Upcoming Events</h1>
              <div className="space-y-6 max-w-3xl mx-auto">
                 {/* Mock Events List */}
                 {[1,2,3].map((e) => (
                   <div key={e} className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-xl border-l-4 border-hope-primary hover:shadow-lg transition-shadow">
                      <div className="text-center md:text-left min-w-[80px]">
                        <span className="block text-3xl font-bold text-hope-secondary">2{e}</span>
                        <span className="block text-hope-primary font-bold uppercase text-sm">Oct</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Community Outreach {e}</h3>
                        <p className="text-gray-600 mb-2">Join us as we serve the Kahawa Wendani community with food and fellowship.</p>
                        <span className="text-sm text-gray-400 font-bold">10:00 AM - 2:00 PM</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      case Page.ABOUT:
        return <About />;
      case Page.CONTACT:
        return <Contact />;
      case Page.GIVING:
        return <Giving />;
      default:
        return (
          <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-serif font-bold text-hope-secondary mb-4">Coming Soon</h1>
              <p className="text-gray-600">This page is currently under construction.</p>
              <button 
                onClick={() => handleNavigate(Page.HOME)}
                className="mt-8 text-hope-primary font-bold underline"
              >
                Return Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-hope-bg text-gray-800">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <PrayerBot />
    </div>
  );
};

export default App;