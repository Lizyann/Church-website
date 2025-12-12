import React from 'react';
import { Smartphone, Heart, ShieldCheck } from 'lucide-react';

const Giving: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
         {/* Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-hope-primary font-bold uppercase tracking-widest text-sm">Stewardship</span>
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-hope-secondary mt-2 mb-6">Give Online</h1>
           <p className="text-gray-600 text-lg mb-4">
             "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
           </p>
           <p className="text-hope-primary font-serif italic font-bold">- 2 Corinthians 9:7</p>
         </div>

         {/* Payment Methods */}
         <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
           
           {/* Mobile Money Card */}
           <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
             <div className="bg-hope-secondary p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-30 pattern-grid-lg"></div>
                <Smartphone className="text-hope-primary mx-auto mb-4 relative z-10" size={48} />
                <h2 className="text-2xl font-bold text-white font-serif relative z-10">Mobile Money / M-Pesa</h2>
             </div>
             <div className="p-8">
                <p className="text-gray-600 mb-8 text-center">
                  You can send your tithes and offerings directly to our church treasury number securely.
                </p>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-8 text-center border-2 border-dashed border-gray-200">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Send To Phone Number</p>
                   <p className="text-3xl sm:text-4xl font-bold text-hope-secondary font-mono tracking-tight">+254 700 000 000</p>
                   <div className="mt-2 inline-flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                      <ShieldCheck size={12} /> Verified: Hope Chapel Treasury
                   </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl">
                   <h4 className="font-bold text-hope-secondary text-sm mb-3">Quick Instructions:</h4>
                   <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                     <li>Open your M-Pesa Menu</li>
                     <li>Select <strong>Send Money</strong></li>
                     <li>Enter Phone Number: <strong>0700 000 000</strong></li>
                     <li>Enter Amount</li>
                     <li>Enter PIN and Send</li>
                   </ol>
                </div>
             </div>
           </div>

           {/* Why We Give */}
           <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-hope-primary/10 rounded-full flex items-center justify-center text-hope-primary">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 font-serif">Why We Give</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Giving is an act of worship and gratitude. Your generosity helps us support our community outreach programs in Kahawa Wendani, maintain our place of worship, and spread the Gospel.
                </p>
              </div>
           </div>

         </div>
      </div>
    </div>
  );
};

export default Giving;