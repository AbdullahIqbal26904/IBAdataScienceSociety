import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import logoPlaceholder from '../../assets/image4.png'; // Using a placeholder image

const AboutUs = () => {
    const { society } = useSelector((state) => state.allCart);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
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

    return (
        <section id="about" className="py-20 px-4 md:px-8 relative">
            {/* Background gradients */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-0 w-full h-full"
            >
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob" />
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob animation-delay-4000" />
            </motion.div>
            
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Us</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left column - Logo and image */}
                    <motion.div 
                        className="flex flex-col items-center lg:items-start"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 blur-md"></div>
                            <img 
                                src={logoPlaceholder} 
                                alt="IBA Data Science Society Logo" 
                                className="relative w-full h-full object-cover rounded-full border-4 border-gray-900"
                            />
                        </motion.div>
                        
                        <motion.div 
                            className="text-center lg:text-left"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Vision</h3>
                            <p className="text-gray-300 mb-6">{society.vision}</p>
                        </motion.div>
                    </motion.div>

                    {/* Right column - Mission and details */}
                    <motion.div 
                        className="text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-gray-300 mb-8">{society.mission}</p>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Who We Are</h3>
                            <div className="space-y-4">
                                {society.about.map((paragraph, index) => (
                                    <p key={index} className="text-gray-300">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="mt-10"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block py-3 px-8 bg-gradient-to-r from-primary to-secondary rounded-full text-black font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Join Our Community
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
