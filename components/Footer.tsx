import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links = [
    { label: 'About Us', page: Page.ABOUT },
    { label: 'Sermons', page: Page.SERMONS },
    { label: 'Events', page: Page.EVENTS },
    { label: 'Ministries', page: Page.HOME }, // Assuming ministries are on home for now
    { label: 'Contact', page: Page.CONTACT }
  ];

  return (
    <footer className="bg-hope-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => onNavigate(Page.HOME)}
            >
               <div className="w-10 h-10 bg-hope-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">H</div>
               <span className="font-serif font-bold text-2xl">Hope Chapel</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are a loving community of believers in Kahawa Wendani, dedicated to spreading the light of Christ to our neighbors and the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {links.map(item => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.page)}
                    className="hover:text-hope-primary cursor-pointer transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-hope-primary mt-1" />
                <span>Kahawa Wendani,<br />Off Thika Road, Nairobi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-hope-primary" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-hope-primary" />
                <span>info@hopechapel.ke</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="font-serif font-bold text-lg mb-6 text-white">Newsletter</h4>
             <p className="text-sm text-gray-400 mb-4">Sign up for weekly updates and devotionals.</p>
             <div className="flex flex-col gap-2">
               <input 
                 type="email" 
                 placeholder="Your Email Address" 
                 className="bg-white/5 border border-white/10 p-3 rounded text-sm text-white focus:outline-none focus:border-hope-primary transition-colors"
               />
               <button className="bg-hope-primary text-white font-bold py-2 rounded hover:bg-white hover:text-hope-secondary transition-colors">
                 Subscribe
               </button>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Hope Chapel Kahawa Wendani. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             {[Facebook, Twitter, Instagram].map((Icon, i) => (
               <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-hope-primary hover:text-white transition-all">
                 <Icon size={14} />
               </a>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;