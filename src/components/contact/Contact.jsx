import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Contact = () => {
    const { society } = useSelector((state) => state.allCart);

    return (
        <section id="contact" className="py-20 px-4 md:px-8 relative">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/20 rounded-full filter blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50" />
            </div>

            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Us</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Become a part of the IBA Data Science Society and embark on a journey of learning, collaboration, and innovation.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                        
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="john@example.com"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="I want to join the society"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Tell us about yourself and why you want to join..."
                                ></textarea>
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-black font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                    
                    {/* Right Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl mb-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary rounded-full p-2 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Email</h4>
                                        <a href={`mailto:${society.socialLinks.email}`} className="text-gray-300 hover:text-primary transition-colors">
                                            {society.socialLinks.email}
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary rounded-full p-2 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Location</h4>
                                        <p className="text-gray-300">IBA Main Campus, University Road, Karachi, Pakistan</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary rounded-full p-2 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Follow Us</h4>
                                        <div className="flex mt-2 space-x-3">
                                            <a href={society.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                </svg>
                                            </a>
                                            <a href={society.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22.23 0H1.77C.79 0 0 .774 0 1.73v20.54C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.73V1.73C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9.084h3.53v11.368zM5.325 7.66a2.05 2.05 0 11.001-4.1 2.05 2.05 0 010 4.1zM20.452 20.452h-3.53V14.99c0-1.3-.025-2.971-1.814-2.971-1.813 0-2.09 1.417-2.09 2.88v5.553h-3.53V9.084h3.39v1.558h.05c.473-.895 1.63-1.837 3.356-1.837 3.59 0 4.255 2.36 4.255 5.43v6.217z" />
                                                </svg>
                                            </a>
                                            <a href={society.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.04c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.805 1.305 3.49.998.107-.774.418-1.305.762-1.604-2.665-.303-5.466-1.333-5.466-5.933 0-1.31.467-2.381 1.235-3.22-.123-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.006-.404c1.02.005 2.047.137 3.006.404 2.292-1.553 3.3-1.23 3.3-1.23.654 1.653.242 2.873.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.37.814 1.096.814 2.213v3.285c0 .319.192.694.801.577C20.565 21.796 24 17.298 24 12 24 5.37 18.63 0 12 0z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Google Form alternative */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Join through Google Form</h3>
                            <p className="text-gray-300 mb-6">
                                Alternatively, fill out our membership form to join the society and stay updated with all our events.
                            </p>
                            <a 
                                href="https://forms.google.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-flex items-center py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2zM8 19H5v-9h3v9zm-1.5-10.75c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 19h-3v-4.74c0-.97-.02-2.22-1.35-2.22-1.35 0-1.56 1.06-1.56 2.15V19h-3v-9h2.88v1.32h.04c.35-.66 1.2-1.35 2.47-1.35 2.64 0 3.14 1.74 3.14 4v5.03z" />
                                </svg>
                                Open Google Form
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
