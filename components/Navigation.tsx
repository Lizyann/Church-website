import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', value: Page.HOME },
    { label: 'Sermons', value: Page.SERMONS },
    { label: 'Events', value: Page.EVENTS },
    { label: 'About Us', value: Page.ABOUT },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="w-10 h-10 bg-hope-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
            H
          </div>
          <div className={`font-serif font-bold text-2xl ${isScrolled ? 'text-hope-secondary' : 'text-white'}`}>
            Hope Chapel
            <span className={`block text-xs font-sans font-normal tracking-wide ${isScrolled ? 'text-gray-500' : 'text-gray-200'}`}>
              KAHAWA WENDANI
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => onNavigate(link.value)}
              className={`font-sans font-medium text-sm uppercase tracking-wider transition-colors hover:text-hope-primary ${
                currentPage === link.value 
                  ? 'text-hope-primary' 
                  : (isScrolled ? 'text-gray-700' : 'text-white')
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate(Page.GIVING)}
            className="bg-hope-primary hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-medium transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <Heart size={16} fill="currentColor" />
            Give Online
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-hope-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? '#2C3E50' : 'white'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center gap-4 animate-fade-in-down">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => {
                onNavigate(link.value);
                setIsMobileMenuOpen(false);
              }}
              className={`font-sans font-medium text-lg ${
                currentPage === link.value ? 'text-hope-primary' : 'text-gray-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
             onClick={() => {
              onNavigate(Page.GIVING);
              setIsMobileMenuOpen(false);
            }}
            className="bg-hope-primary text-white px-8 py-3 rounded-full font-medium"
          >
            Give Online
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;