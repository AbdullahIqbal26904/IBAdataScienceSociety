import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { society } = useSelector((state) => state.allCart);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);
            
            // Determine which section is in view
            const sections = ['hero', 'about', 'events', 'dataverse', 'projects', 'gallery', 'contact'];
            let currentActive = '';
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is in the viewport (with some margin)
                    if (rect.top <= 200 && rect.bottom >= 100) {
                        currentActive = section === 'hero' ? '' : section;
                        break;
                    }
                }
            }
            
            setActiveSection(currentActive);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const listNavbar = [
        { name: 'Home', link: '#hero' },
        { name: 'About Us', link: '#about' },
        { name: 'Events', link: '#events' },
        { name: 'DataVerse', link: '#dataverse' },
        { name: 'Projects', link: '#projects' },
        { name: 'Gallery', link: '#gallery' },
    ];

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);
    
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
                        className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                    >
                        IBA Data Science Society
                    </motion.span>
                </a>
                
                {/* Mobile menu button */}
                <div className="md:hidden ml-auto">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex md:ml-auto flex-wrap items-center justify-center">
                    {listNavbar.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className={`relative mx-3 py-2 px-3 text-sm font-medium transition-all duration-300 ${
                                activeSection === (item.link.replace('#', '')) 
                                ? 'text-primary' 
                                : 'text-white hover:text-primary/80'
                            }`}
                        >
                            {item.name}
                            {activeSection === (item.link.replace('#', '')) && (
                                <motion.span 
                                    layoutId="navIndicator"
                                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" 
                                />
                            )}
                        </a>
                    ))}
                </nav>
                
                {/* Join Us Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:inline-flex items-center py-2 px-7 mt-4 md:mt-0 ml-4 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/40 transition-all duration-300"
                >
                    <a href="#contact">Join Us</a>
                </motion.button>
                
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg md:hidden py-4 shadow-xl"
                    >
                        <div className="flex flex-col items-center gap-4">
                            {listNavbar.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    onClick={closeMobileMenu}
                                    className={`py-2 px-4 text-center w-full ${
                                        activeSection === (item.link.replace('#', '')) 
                                        ? 'text-primary font-medium' 
                                        : 'text-white'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className="w-4/5 py-3 mt-2 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium text-center"
                            >
                                Join Us
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
}
