import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Numbers() {
    const [projectsCount, setProjectsCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [cgpaCount, setCgpaCount] = useState(0);
    const [startCounting, setStartCounting] = useState(false);
    const ref = useRef(null);

    const stats = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5ZM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3ZM14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"/>
                </svg>
            ),
            value: Math.floor(projectsCount),
            suffix: '+',
            label: 'Projects Completed'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            ),
            value: Math.floor(experienceCount),
            suffix: '+',
            label: 'Years of Experience'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 21 6-1 7-7-5-5-7 7-1 6zm12-12 2-2a1.414 1.414 0 0 0 0-2l-3-3a1.414 1.414 0 0 0-2 0l-2 2 5 5z"/>
                </svg>
            ),
            value: cgpaCount.toFixed(2),
            label: 'University CGPA'
        }
    ];

    const animateCount = (setter, maxValue, speed) => {
        const increment = maxValue / speed;
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            setter(prev => {
                const newValue = prev + increment;
                if (newValue >= maxValue) {
                    clearInterval(interval);
                    return maxValue; // Ensure it caps at maxValue
                }
                return newValue;
            });
        }, 80);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStartCounting(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (startCounting) {
            animateCount(setProjectsCount, 15, 30); // Example: 15 projects
            animateCount(setExperienceCount, 5, 25); // Example: 5 years experience
            animateCount(setCgpaCount, 3.27, 50); // Example: CGPA of 3.27
        }
    }, [startCounting]);

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <section className="relative w-full py-24">
            {/* Gradient background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1.5 }}
                    className="absolute w-3/4 aspect-square rounded-full bg-gradient-to-br from-primary to-[#ff6667] blur-[120px] -right-1/3 -top-1/2"
                />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Journey in Numbers</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                </motion.div>
                
                <motion.div 
                    ref={ref}
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-md transform group-hover:scale-105 transition-transform duration-300"></div>
                            <motion.div 
                                className="relative p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 flex flex-col items-center text-center h-full"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary bg-opacity-10 text-white mb-5">
                                    {stat.icon}
                                </div>
                                <h3 className="text-5xl font-bold text-white mb-2">
                                    <span>{stat.value}</span>
                                    <span className="text-primary">{stat.suffix}</span>
                                </h3>
                                <p className="text-white/70 text-lg">{stat.label}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Numbers;
