import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Skillscircle from './Skillscircle';

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const { user } = useSelector((state) => state.allCart);
    const [loading, setLoading] = useState(true);
    
    // Categories for skills filtering (will be dynamically populated)
    const [categories, setCategories] = useState(['All']);
    
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`https://portfoliobackend-cpj1.onrender.com/skills/${user._id}`);
                const data = await res.json();
                setSkills(data);
                setFilteredSkills(data);
                
                // Extract unique categories from skills data
                const uniqueCategories = ['All'];
                data.forEach(skill => {
                    if (skill.category && !uniqueCategories.includes(skill.category)) {
                        uniqueCategories.push(skill.category);
                    }
                });
                setCategories(uniqueCategories);
                
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        
        if (user && user._id) {
            fetchSkills();
        }
    }, [user]);
    
    // Filter skills when category changes
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredSkills(skills);
        } else {
            setFilteredSkills(skills.filter(skill => 
                skill.category === selectedCategory
            ));
        }
    }, [selectedCategory, skills]);
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };
    
    if (loading) {
        return (
            <div className="relative flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 relative">
                        <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-4 text-white/80">Loading skills...</p>
                </div>
            </div>
        );
    }
    
    return (
        <section id="skills" className="relative py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1.5 }}
                    className="absolute w-3/4 aspect-square rounded-full bg-gradient-to-br from-[#007cda] to-primary blur-[120px] -left-1/3 -bottom-1/2"
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
                        My Skills
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
                    <p className="max-w-3xl mx-auto text-gray-300 text-lg">
                        I have developed a wide range of technical skills that have helped me grow as a professional in various domains. Below, you can see a visual representation of my proficiency in each skill area.
                    </p>
                </motion.div>
                
                {/* Category filter tabs */}
                {categories.length > 1 && (
                    <motion.div 
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-primary to-secondary text-black shadow-lg shadow-primary/25'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
                
                {/* Skills grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                >
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex justify-center"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Skillscircle skill={skill} />
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Empty state if no skills found */}
                {filteredSkills.length === 0 && (
                    <div className="text-center py-12 text-white/60">
                        No skills found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
