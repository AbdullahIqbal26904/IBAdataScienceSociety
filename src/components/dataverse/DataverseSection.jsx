import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const DataverseSection = () => {
    const { society } = useSelector((state) => state.allCart);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Set a fixed date for DataVerse 2026 - March 15, 2026
    useEffect(() => {
        const targetDate = new Date('March 15, 2026').getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // If past the date, stop countdown
                return;
            }
            
            setTimeRemaining({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };
        
        // Initial update
        updateCountdown();
        
        // Update countdown every second
        const interval = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="dataverse" className="py-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full filter blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full filter blur-[100px]" />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffaa00] to-secondary mb-4">
                        DataVerse 2026
                    </h2>
                    <h3 className="text-xl md:text-2xl text-white font-light mb-6">
                        {society.dataverse.tagline}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                </motion.div>

                {/* DataVerse Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Event Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                <span className="text-primary">Coming Soon:</span> The Ultimate Data Science Competition
                            </h3>
                            
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {society.dataverse.description}
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1.5 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Event Date</h4>
                                        <p className="text-gray-400">{society.dataverse.date}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1.5 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Registration</h4>
                                        <p className="text-gray-400">{society.dataverse.registration}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Form Notification */}
                            <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700">
                                <h4 className="text-white font-medium mb-2">Get Notified When Registration Opens</h4>
                                <div className="flex mt-3">
                                    <input 
                                        type="email" 
                                        className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                                        placeholder="Enter your email"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-primary to-secondary text-black px-4 py-2.5 rounded-r-lg font-medium text-sm"
                                    >
                                        Notify Me
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Right Column - Countdown & Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        {/* Countdown Timer */}
                        <div className="mb-12 w-full">
                            <h3 className="text-xl text-center text-white mb-8">Countdown to DataVerse 2026</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { label: "Days", value: timeRemaining.days },
                                    { label: "Hours", value: timeRemaining.hours },
                                    { label: "Minutes", value: timeRemaining.minutes },
                                    { label: "Seconds", value: timeRemaining.seconds }
                                ].map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 text-center"
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                                            {item.value < 10 ? `0${item.value}` : item.value}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Event Visual */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-md"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-md opacity-50"></div>
                            <div className="relative overflow-hidden rounded-2xl border-2 border-white/20">
                                <img 
                                    src={society.dataverse.image} 
                                    alt="DataVerse Event" 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-white">DataVerse 2026</h3>
                                        <p className="text-gray-300">The flagship event of IBA Data Science Society</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DataverseSection;
