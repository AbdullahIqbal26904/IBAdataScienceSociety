import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import hi from '../../assets/hi.png';
import img from '../../assets/myimg.jpg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser,setshowloader } from '../../redux/features/portfolioSlice';
import Typical from 'react-typical';
import { variants } from '../data/config';
import SocialButtons from '../buttons/SocialButtons';
function HeroSection() {
    const { user,userBio } = useSelector((state) => state.allCart);
    const [data, setData] = useState(true);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Add loading state
    // const [userBio, setuserBio] = useState([]);
    
    function splitSentences(bio) {
        const sentences = bio.split(/(?<=\.|\!|\?)\s+/);
        // Add a delay of 1000ms after each sentence
        return sentences.flatMap(sentence => [sentence, 1000]);
    }
    
    return (
        <section id='' className="relative">
            {/* Gradient Headers */}
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda] 
                via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block">
            </header>
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
                     via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block">
            </header>
            {/* Main Content */}
            <section className="w-full px-5 sm:px-8 md:px-12 lg:px-0 max-w-screen-lg lg:max-w-screen-xl mx-auto relative">
                <article className="grid lg:grid-cols-2 gap-10 xl:gap-6 relative pt-24 lg:max-w-none max-w-2xl mx-auto">
                    <section
                        className="1g:py-6 flex justify-between">
                        <SocialButtons />
                        <section
                            data-aos='fade-up'
                            data-aos-delay='200'
                            className="m1-0 md:m1-12">
                            <section className="ml-0 md:ml-12">
                                <header className="text-center lg:text-left">
                                    <h1 className="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl">
                                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
                                            {user.name}
                                        </span>
                                    </h1>
                                    <h2 className="pt-1 text-white font-bold text-1xl md:text-2xl lg:text-3xl">
                                        <Typical
                                            steps={userBio}
                                            loop={Infinity}
                                            wrapper="p"
                                        />

                                    </h2>
                                    
                                </header>
                                <section

                                    className="flex items-center justify-center gap-3 pt-9 flex-col sm:flex-row sm:w-max mx-auto md:mx-0">
                                    <figure className="text-white w-56">
                                        {/* <button>Hire me</button> */}
                                    </figure>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="flex items-center py-2 px-4 bg-transparent text-primary border-1 border border-primary rounded-3xl"
                                    >
                                        <svg viewBox="0 0 24 24" width={40} height={40}>
                                            <motion.path
                                                d="M12 15.586l4.95-4.95-1.414-1.414L13 12.172V4h-2v8.172L8.464 9.636 7.05 11.05 12 15.586zm-7 2h14v2H5v-2z"
                                                fill="#FFC107"
                                                stroke="#FFC107"
                                                strokeWidth={1.0}
                                                variants={variants}
                                                initial="initial"
                                                animate="animate"
                                            />
                                        </svg>
                                        <span>Download Resume</span>
                                    </motion.button>
                                </section>
                            </section>
                        </section>
                        <figure
                            data-aos='fade-up'
                            data-aos-delay='300'
                            className="absolute right-20 lg:h-full md:flex md:justify-end mt-20 md:mt-0">
                            <div className="animate-zoomRotate w-[350px] h-[350px] md:w-[400px] md:h-[400px] flex justify-center items-center p-4 rounded-full overflow-hidden relative bg-gradient-to-r from-[#FFC107] to-[#ff6667]">
                                <img
                                    src={img}
                                    alt="My Image"
                                    className="relative z-10 rounded-full w-[98%] h-[98%] object-cover shadow-2xl transform transition-transform duration-500"
                                />
                            </div>
                        </figure>
                    </section>
                </article>
            </section>
        </section>
    );
}

export default HeroSection;

