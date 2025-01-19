import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Projects() {
    const { user } = useSelector((state) => state.allCart);
    const [fprojects, setProjects] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null); // Track hovered project

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(`http://localhost:3003/projects/${user._id}`);
                console.log(res.data);
                setProjects(res.data);
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
                                key={project._id} // Unique key
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
                                            // onError={(e) => {
                                            //     e.target.style.display = 'none'; // Hide video if it fails to load
                                            // }}
                                        />
                                    ) : (
                                        <img
                                            src={project.projects.images?.[0] || '/default-image.jpg'} // Fallback to default image
                                            alt={project.projects.title}
                                            className="w-full h-auto lg:h-48 md:h-36 sm:h-24 object-cover object-center"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                                            {project.projects.title}
                                        </h2>
                                        <p className="leading-relaxed mb-3">{project.projects.description}</p>
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
