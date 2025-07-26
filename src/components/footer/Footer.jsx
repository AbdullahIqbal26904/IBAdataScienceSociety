import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from '../data/config';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    const links = [
        { name: 'Home', link: '' },
        { name: 'Skills', link: '#skills' },
        { name: 'Education', link: '#education' },
        { name: 'Experience', link: '#experience' },
        { name: 'Language', link: '#language' },
        { name: 'Projects', link: '#projects' },
    ];
    
    const otherLinks = [
        { name: 'Privacy Policy', link: '#' },
        { name: 'Terms of Service', link: '#' },
        { name: 'Sitemap', link: '#' },
    ];
    
    return (
        <footer className="relative bg-black bg-opacity-50 backdrop-blur-md pt-16 border-t border-white/10 min-h-[80vh] flex flex-col justify-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                    {/* Brand & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
                        >
                            Portfolio
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-400 mb-6 max-w-md"
                        >
                            A showcase of my skills, projects, and professional journey. I specialize in creating beautiful, functional, and user-friendly digital experiences.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex space-x-4 mt-6"
                        >
                            {socialIcons.map((icon) => (
                                <a
                                    key={icon.id}
                                    href={icon.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={icon.name}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                >
                                    <svg viewBox={icon.viewBox} width={20} height={20} className="text-primary">
                                        <path d={icon.path} fill="currentColor" />
                                    </svg>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-lg font-semibold text-white mb-4"
                        >
                            Quick Links
                        </motion.h3>
                        <motion.ul 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-3"
                        >
                            {links.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.link} 
                                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-lg font-semibold text-white mb-4"
                        >
                            Contact
                        </motion.h3>
                        <motion.ul 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-3"
                        >
                            <li className="text-gray-400 flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-3 mt-1 text-primary flex-shrink-0">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 5 3.5L17 9" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                                </svg>
                                contact@example.com
                            </li>
                            <li className="text-gray-400 flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-3 mt-1 text-primary flex-shrink-0">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.893 4.871A13.528 13.528 0 0 1 12 4.5c6.2 0 11.5 4.029 11.5 9 0 2.209-1.174 4.215-3.025 5.708.082 1.948.232 3.52.825 4.292-.825 0-3.025-1.324-4.537-2.358a13.84 13.84 0 0 1-4.763.858c-6.2 0-11.5-4.03-11.5-9 0-4.97 5.3-9 11.5-9" />
                                </svg>
                                (123) 456-7890
                            </li>
                            <li className="text-gray-400 flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-3 mt-1 text-primary flex-shrink-0">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.589 0h-.011l.01.011.009.011L12 21l5.782-7.04.009-.011.01-.01Z" />
                                </svg>
                                New York, NY, USA
                            </li>
                        </motion.ul>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-6 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {currentYear} Portfolio. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {otherLinks.map((link, index) => (
                                <a key={index} href={link.link} className="text-gray-400 text-sm hover:text-primary transition-colors duration-300">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Back to top button */}
            <a
                href="#"
                className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300"
                title="Back to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m0-12 4 4m-4-4-4 4" />
                </svg>
            </a>
        </footer>
    );
}
