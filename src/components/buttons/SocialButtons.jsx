import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from '../data/config';

export default function SocialButtons({ display = "vertical" }) {
    const variants = {
        initial: { scale: 0, opacity: 0 },
        animate: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
                ease: "easeOut"
            }
        }),
        hover: {
            scale: 1.2,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        tap: {
            scale: 0.9
        }
    };

    // Parent container variants for staggered children animation
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Styling changes based on display mode
    const isVertical = display === "vertical";
    
    return (
        <motion.div 
            className={`flex ${isVertical ? 'flex-col space-y-4 md:space-y-6' : 'flex-row space-x-3 sm:space-x-4 md:space-x-6'} items-center justify-center`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {socialIcons.map((icon, index) => (
                <motion.a
                    key={icon.id}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon.name}
                    className={`flex items-center justify-center ${
                        isVertical 
                            ? 'w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20' 
                            : 'w-9 h-9 sm:w-10 sm:h-10'
                    } transition-colors duration-300`}
                    custom={index}
                    variants={variants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <svg 
                        viewBox={icon.viewBox} 
                        width={isVertical ? 18 : 20} 
                        height={isVertical ? 18 : 20}
                        className={`${isVertical ? 'text-white' : 'text-primary'}`}
                    >
                        <path
                            d={icon.path}
                            fill="currentColor"
                        />
                    </svg>
                </motion.a>
            ))}
        </motion.div>
    );
}
