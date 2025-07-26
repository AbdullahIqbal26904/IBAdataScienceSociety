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
    const [loading, setLoading] = useState(true);

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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    centerMode: true,
                    centerPadding: '15px',
                }
            }
        ],
    };

    if (loading) {
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
                                key={index}
                                className="p-4"
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="h-full flex flex-col border-2 border-orange-400 shadow-lg rounded-lg overflow-hidden">
                                    {hoveredProject === index && project.projects.live_demo ? (
                                        <video
                                            src={project.projects.live_demo}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-56 object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={project.projects.images?.[0] || '/default-image.jpg'}
                                            alt={project.projects.title}
                                            className="w-full h-56 object-cover"
                                        />
                                    )}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <h2 className="text-lg font-semibold text-orange-400 mb-2">
                                            {project.projects.title}
                                        </h2>
                                        <p className="text-gray-300 flex-grow">{project.projects.description}</p>
                                        <div className="mt-4">
                                            <h3 className="text-orange-400 font-semibold">Technologies:</h3>
                                            <ul className="list-disc list-inside text-gray-300">
                                                {project.projects.technologies.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <a
                                                href={project.projects.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                GitHub
                                            </a>
                                            {/* Uncomment below for live demo link */}
                                            {/* {project.projects.live_demo && (
                                                <a
                                                    href={project.projects.live_demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Live Demo
                                                </a>
                                            )} */}
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
