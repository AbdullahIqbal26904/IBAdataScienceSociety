import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.3 } }
  };
  
  return (
    <section id='contact' className="relative py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute w-3/4 aspect-square rounded-full bg-gradient-to-br from-primary to-[#ff6667] blur-[120px] -right-1/3 top-0"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {/* Contact Info Cards */}
            <motion.div 
              className="md:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Email Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.5 18h-19a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h19a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3.5 6.5 8.5 7 8.5-7" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-300">contact@example.com</p>
              </motion.div>
              
              {/* Phone Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 6.5v-4a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 14.5h5m-2.5-2.5v5" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-300">+1 (234) 567-8910</p>
              </motion.div>
              
              {/* Location Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.589 0h-.011l.01.011.009.011L12 21l5.782-7.04.009-.011.009-.01Z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-300">New York, NY, USA</p>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="md:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 5 5L20 7" className="text-green-500" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                      <motion.div variants={inputVariants} whileFocus="focus">
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
                          placeholder="Your name" 
                          required 
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                      <motion.div variants={inputVariants} whileFocus="focus">
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
                          placeholder="your.email@example.com" 
                          required 
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">Subject</label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
                        placeholder="How can I help you?" 
                        required 
                      />
                    </motion.div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <textarea 
                        id="message" 
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows="5" 
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
                        placeholder="Your message here..." 
                        required
                      ></textarea>
                    </motion.div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-black font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
