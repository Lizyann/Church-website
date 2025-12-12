import React from 'react';
import { Target, Eye, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-hope-secondary mb-4 animate-fade-in-up">About Hope Chapel</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Located in the heart of Kahawa Wendani, we are a family of believers passionate about God and people.
        </p>
      </div>

      {/* Who We Are */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=800&auto=format&fit=crop" 
              alt="Congregation" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]" 
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-hope-primary font-bold uppercase tracking-widest text-sm">Welcome Home</span>
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6 mt-2">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Hope Chapel Kahawa Wendani was founded with a simple desire: to create a space where people from all walks of life can encounter the transforming love of Jesus Christ. 
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in the power of community, the authority of Scripture, and the active presence of the Holy Spirit. Whether you are a student at the nearby university, a young family, or a long-time resident, there is a place for you here. We are more than just a church; we are a family dedicated to growing in faith and serving our community with love.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-hope-bg py-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-hope-primary transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-hope-primary/10 rounded-full flex items-center justify-center mb-6">
                <Target className="text-hope-primary" size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 italic text-lg leading-relaxed">
                "To glorify God by making disciples who love God, love people, and serve the world with the compassion of Christ."
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-hope-secondary transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-hope-secondary/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="text-hope-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 italic text-lg leading-relaxed">
                "To be a beacon of hope in Kahawa Wendani, transforming our community and nation through the power of the Gospel and the pursuit of holiness."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scripture */}
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="bg-hope-secondary text-white p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <BookOpen className="mx-auto mb-6 text-hope-primary" size={48} />
            <blockquote className="font-serif text-2xl md:text-4xl font-bold leading-relaxed mb-8 max-w-4xl mx-auto">
              "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <cite className="text-hope-primary font-bold tracking-widest uppercase not-italic text-lg">Jeremiah 29:11</cite>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default About;