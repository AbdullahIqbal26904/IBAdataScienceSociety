import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Skillscircle from './Skillscircle';

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const { user } = useSelector((state) => state.allCart);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch(`http://localhost:3003/skills/${user._id}`);
                const data = await res.json();
                setSkills(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user && user._id) {
            fetchSkills();
        }
    }, [user]);

    return (
        <section id="skills" className="relative overflow-hidden flex flex-col text-white body-font">
            {/* Background Gradients */}
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda] 
                via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block">
            </header>
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
                     via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block">
            </header>

            <div className="container flex flex-col px-5 py-24 mx-auto items-center space-y-16">
                {/* Top Column: Skills Heading & Text */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="w-full md:w-1/2 text-center space-y-8"
                >
                    <h1
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="sm:text-5xl text-3xl font-bold title-font text-gradient text-orange-500 bg-clip-text  text-center mb-12"
                    >
                        My Skills
                    </h1>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="leading-relaxed text-lg text-gray-400"
                    >
                        I have developed a wide range of technical skills that have helped me grow as a professional in various domains. From programming and problem-solving to design and user experience, my skill set is diverse and continuously evolving. Below, you can see a visual representation of my proficiency in each skill area. I continuously work on improving these skills through hands-on experience and learning.
                    </p>
                </div>

                {/* Beautiful Horizontal Line */}
                <hr className="w-full h-1 mx-auto bg-gradient-to-r from-[#007cda] to-primary rounded-full mb-12" />

                {/* Bottom Column: Skills Circles */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="500"
                    className="w-full flex flex-wrap justify-center gap-y-10"
                >
                    <ul className=" flex flex-wrap justify-center gap-20">
                        {skills.map((skill, index) => (
                            <li
                                key={index}
                            >
                                <Skillscircle skill={skill} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
