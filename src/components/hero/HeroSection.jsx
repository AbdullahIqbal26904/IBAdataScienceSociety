import React, { useEffect } from 'react';
import img from '../../assets/myimg.jpg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import SocialButtons from '../buttons/SocialButtons';

function HeroSection() {
    const { user, userBio } = useSelector((state) => state.allCart);
    
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };
    
    // Animation for scroll hint
    const scrollVariants = {
        initial: { y: 0 },
        animate: {
            y: [0, 10, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };
    
    return (
        <section id="hero" className="relative min-h-screen flex items-center py-16 md:py-0">
            {/* Animated gradient backgrounds */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute w-1/2 aspect-square rounded-full bg-gradient-to-r from-[#007cda] via-[#785ae4] to-primary blur-[120px] -left-1/4 top-0"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
                className="absolute w-1/2 aspect-square rounded-full bg-gradient-to-r from-primary via-[#ff6667] to-[#ff18b8] blur-[120px] -right-1/4 bottom-0"
            />
            
            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Column - Text Content */}
                    <motion.div className="w-full lg:w-1/2 text-center lg:text-left" variants={itemVariants}>
                        <div className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <span className="inline-block py-1 px-3 text-xs md:text-sm rounded-full bg-white/10 backdrop-blur-sm text-primary mb-4">
                                    Welcome to my portfolio
                                </span>
                            </motion.div>
                            
                            <motion.h1 
                                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white"
                                variants={itemVariants}
                            >
                                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    {user.name}
                                </span>
                            </motion.h1>
                            
                            <motion.div 
                                className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80 min-h-[6rem]"
                                variants={itemVariants}
                            >
                                <Typewriter
                                    words={userBio}
                                    loop={Infinity}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </motion.div>
                            
                            <motion.div 
                                className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
                                variants={itemVariants}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-3 px-8 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/40 transition-all duration-300"
                                >
                                    Hire Me
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-3 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15.586l4.95-4.95-1.414-1.414L13 12.172V4h-2v8.172L8.464 9.636 7.05 11.05 12 15.586zm-7 2h14v2H5v-2z" fill="currentColor"/>
                                        </svg>
                                        <span>Download Resume</span>
                                    </div>
                                </motion.button>
                            </motion.div>
                            
                            {/* Social media links for mobile */}
                            <motion.div
                                className="flex justify-center lg:justify-start gap-6 mt-8 lg:hidden"
                                variants={itemVariants}
                            >
                                <SocialButtons display="horizontal" />
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    {/* Right Column - Profile Image */}
                    <motion.div 
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            {/* Background animated elements */}
                            <motion.div 
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 blur-md"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ 
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut" 
                                }}
                            />
                            
                            {/* Main circular frame */}
                            <motion.div 
                                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full p-2 bg-gradient-to-r from-primary to-secondary"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Profile image */}
                                <img
                                    src={img}
                                    alt={`${user.name}'s Profile`}
                                    className="w-full h-full object-cover rounded-full border-4 border-black"
                                />
                                
                                {/* Decorative circles */}
                                <motion.div 
                                    className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary"
                                    animate={{ 
                                        y: [0, -10, 0],
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                    }}
                                />
                                <motion.div 
                                    className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-secondary"
                                    animate={{ 
                                        x: [0, 10, 0],
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
                
                {/* Desktop Social media sidebar */}
                <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
                    <SocialButtons display="vertical" />
                </div>
                
                {/* Scroll hint */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50"
                    variants={scrollVariants}
                    initial="initial"
                    animate="animate"
                >
                    <span className="text-xs mb-2">Scroll down</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17L12 7M12 17L8 13M12 17L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;

