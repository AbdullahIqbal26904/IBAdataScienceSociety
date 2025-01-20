import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Projects() {
    const { user } = useSelector((state) => state.allCart);
    const [fprojects, setProjects] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(`https://portfoliobackend-cpj1.onrender.com/projects/${user._id}`);
                console.log(res.data);
                setProjects(res.data);
                setLoading(false); 
            } catch (err) {
                console.error('Error fetching projects:', err);
            }
        };

        getProjects();
    }, [user]);

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    if (loading) {
        // Display loading screen or spinner
        return (
            <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <section
            data-aos="fade-up"
            data-aos-delay="400"
            id="projects"
            className="relative overflow-hidden flex flex-col text-white body-font"
        >
            <h2 className="sm:text-5xl text-3xl font-bold title-font text-gradient text-orange-500 bg-clip-text text-center mb-12">
                My Projects
            </h2>
            <div className="container px-5 py-24 mx-auto">
                {fprojects.length > 0 ? (
                    <Slider {...settings}>
                        {fprojects.map((project, index) => (
                            <div
                                key={project._id}
                                className="p-4"
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="h-full border-2 border-orange-400 shadow-[0_0_15px_rgba(255,165,0,0.7)] border-opacity-60 rounded-lg overflow-hidden relative">
                                    {hoveredProject === index && project.projects.live_demo ? (
                                        <video
                                            src={project.projects.live_demo}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-auto lg:h-48 md:h-36 sm:h-24 object-cover object-center"
                                        />
                                    ) : (
                                        <img
                                            src={project.projects.images?.[0] || '/default-image.jpg'}
                                            alt={project.projects.title}
                                            className="w-full h-auto lg:h-48 md:h-36 sm:h-24 object-cover object-center"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                                            {project.projects.title}
                                        </h2>
                                        <p className="leading-relaxed mb-3">{project.projects.description}</p>
                                        <div className="mb-3">
                                            <h3 className="text-orange-400 font-semibold">Technologies:</h3>
                                            <ul className="list-disc list-inside text-gray-300">
                                                {project.projects.technologies.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <a
                                                href={project.projects.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                GitHub
                                            </a>
                                            {project.projects.live_demo && (
                                                <a
                                                    href={project.projects.live_demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="text-center text-gray-400">
                        No projects found. Start adding your work!
                    </div>
                )}
            </div>
        </section>
    );
}
