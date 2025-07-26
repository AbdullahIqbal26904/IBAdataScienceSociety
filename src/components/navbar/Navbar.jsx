import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);
            
            // Determine which section is in view
            const sections = ['', 'skills', 'education', 'experience', 'language', 'projects', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section || 'hero');
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section || '');
                        break;
                    }
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const listNavbar = [
        { name: 'Home', link: '' },
        { name: 'Skills', link: '#skills' },
        { name: 'Education', link: '#education' },
        { name: 'Experience', link: '#experience' },
        { name: 'Language', link: '#language' },
        { name: 'Projects', link: '#projects' },
    ];
    
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'backdrop-blur-md bg-black/30' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="#" className="flex title-font font-medium items-center mb-4 md:mb-0">
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                    >
                        Portfolio
                    </motion.span>
                </a>
                
                <nav className="md:ml-auto flex flex-wrap items-center justify-center">
                    {listNavbar.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className={`relative mx-3 py-2 px-3 text-sm font-medium transition-all duration-300 ${
                                activeSection === (item.link.replace('#', '') || '') 
                                ? 'text-primary' 
                                : 'text-white hover:text-yellow-300'
                            }`}
                        >
                            {item.name}
                            {activeSection === (item.link.replace('#', '') || '') && (
                                <motion.span 
                                    layoutId="navIndicator"
                                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" 
                                />
                            )}
                        </a>
                    ))}
                </nav>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center py-2 px-7 mt-4 md:mt-0 ml-4 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/40 transition-all duration-300"
                >
                    <a href="#contact">Contact me</a>
                </motion.button>
            </div>
        </motion.header>
    );
}
