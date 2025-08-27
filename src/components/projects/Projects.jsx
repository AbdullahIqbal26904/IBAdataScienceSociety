import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
    {
        id: 1,
        title: "Sentiment Analysis Dashboard",
        description: "A real-time sentiment analysis tool for tracking public opinion on social media platforms using NLP techniques.",
        image: "/src/assets/image.png",
        category: "NLP",
        tags: ["Python", "NLTK", "React", "Flask"]
    },
    {
        id: 2,
        title: "Predictive Analytics Model",
        description: "A machine learning model to predict student performance based on various academic and socioeconomic factors.",
        image: "/src/assets/image2.png",
        category: "Machine Learning",
        tags: ["Python", "Scikit-Learn", "Pandas", "TensorFlow"]
    },
    {
        id: 3,
        title: "Data Visualization Workshop Materials",
        description: "Interactive notebooks and resources for teaching data visualization principles using Python libraries.",
        image: "/src/assets/image3.png",
        category: "Visualization",
        tags: ["Python", "Matplotlib", "Seaborn", "Plotly"]
    },
    {
        id: 4,
        title: "Time Series Forecasting Tool",
        description: "A tool for analyzing and forecasting financial data using advanced time series models.",
        image: "/src/assets/image4.png",
        category: "Machine Learning",
        tags: ["Python", "Prophet", "ARIMA", "Pandas"]
    },
    {
        id: 5,
        title: "Recommender System Framework",
        description: "A flexible recommender system framework implemented for the university library to suggest relevant academic resources.",
        image: "/src/assets/img.png",
        category: "Machine Learning",
        tags: ["Python", "Collaborative Filtering", "Content-Based"]
    },
    {
        id: 6,
        title: "Healthcare Data Analysis",
        description: "Analysis of public health datasets to identify patterns and insights for healthcare policy recommendations.",
        image: "/src/assets/web-design.png",
        category: "Data Analysis",
        tags: ["R", "Statistical Modeling", "Tableau"]
    }
];

const categories = ["All", "Machine Learning", "NLP", "Data Analysis", "Visualization"];

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [hoveredProject, setHoveredProject] = useState(null);
    
    const filteredProjects = activeCategory === "All" 
        ? projectsData 
        : projectsData.filter(project => project.category === activeCategory);
    
    return (
        <section id="projects" className="py-20 px-4 md:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Explore some of the data science projects developed by our society members, showcasing the practical applications of data analytics and machine learning.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Category Filter */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCategory === category
                                ? "bg-gradient-to-r from-primary to-secondary text-black"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                            index={index}
                            isHovered={hoveredProject === project.id}
                            onHover={() => setHoveredProject(project.id)}
                            onLeave={() => setHoveredProject(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-xl group h-[380px]"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                    {/* Category Badge */}
                    <div className="mb-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary backdrop-blur-md">
                            {project.category}
                        </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {project.title}
                    </h3>
                    
                    {/* Description */}
                    <motion.p 
                        className="text-gray-300 mb-4 text-sm"
                        animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
                    >
                        {project.description}
                    </motion.p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                            <span 
                                key={tagIndex} 
                                className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {/* View Project Button */}
                    <motion.button
                        className="py-2 px-4 text-sm bg-gradient-to-r from-primary to-secondary rounded-lg text-black font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Project
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Projects;
