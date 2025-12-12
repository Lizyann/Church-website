import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white pb-16 pt-8">
        <div className="container mx-auto px-4 text-center">
          <span className="text-hope-primary font-bold uppercase tracking-widest text-sm">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-hope-secondary mt-2 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a prayer request, a question, or just want to say hello.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Information Card */}
          <div className="bg-hope-secondary text-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl font-serif font-bold mb-8">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-hope-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Hope Chapel<br />
                    Kahawa Wendani, Off Thika Road<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-hope-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                  <p className="text-gray-300">
                    +254 700 000 000<br />
                    +254 722 000 000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-hope-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Address</h4>
                  <p className="text-gray-300">
                    info@hopechapel.ke<br />
                    prayer@hopechapel.ke
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder Map Image */}
            <div className="mt-12 rounded-xl overflow-hidden h-48 border border-white/10">
               <img 
                 src="https://maps.googleapis.com/maps/api/staticmap?center=Kahawa+Wendani,Nairobi&zoom=14&size=600x300&maptype=roadmap&key=YOUR_API_KEY_HERE&sensor=false" 
                 alt="Map Location"
                 className="w-full h-full object-cover opacity-80"
                 onError={(e) => {
                   e.currentTarget.src = "https://picsum.photos/seed/map/600/300?grayscale" // Fallback if no API key
                 }}
               />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Send a Message</h3>
            
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <CheckCircle size={20} />
                <span>Message sent successfully! We will get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-hope-primary focus:outline-none transition-colors" 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-hope-primary focus:outline-none transition-colors" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-hope-primary focus:outline-none transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-hope-primary focus:outline-none transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Prayer Request</option>
                  <option>Pastoral Care</option>
                  <option>Youth Ministry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-hope-primary focus:outline-none transition-colors" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-hope-primary text-white font-bold py-4 rounded-lg hover:bg-hope-secondary transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;