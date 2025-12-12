import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Share2, Clock, Check } from 'lucide-react';
import { Sermon, Page } from '../types';

interface SermonDetailProps {
  sermon: Sermon;
  onNavigate: (page: Page) => void;
}

const SermonDetail: React.FC<SermonDetailProps> = ({ sermon, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => onNavigate(Page.SERMONS)}
          className="flex items-center gap-2 text-gray-500 hover:text-hope-primary transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to Sermons
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Video Player or Main Image */}
          <div className="w-full aspect-video bg-black">
            {sermon.videoUrl ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={sermon.videoUrl} 
                title={sermon.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <img 
                src={sermon.imageUrl} 
                alt={sermon.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-hope-primary" /> {sermon.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-hope-primary" /> {sermon.preacher}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-hope-primary" /> 45 mins
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-hope-secondary mb-6">
              {sermon.title}
            </h1>

            <div className="prose max-w-none text-gray-600 leading-relaxed mb-8">
              <p className="text-lg mb-4">{sermon.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mt-8 mb-4">Key Takeaways</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Faith requires action, not just belief.</li>
                <li>Community is essential for spiritual growth.</li>
                <li>Prayer is our direct line to divine intervention.</li>
              </ul>
              <p className="mt-6">
                 Join us next Sunday as we continue this series. We look forward to seeing you there!
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95 ${
                  copied 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-hope-primary text-white hover:bg-hope-secondary'
                }`}
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                {copied ? 'Link Copied!' : 'Share Sermon'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SermonDetail;