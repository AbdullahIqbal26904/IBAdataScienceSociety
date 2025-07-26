import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Skills from './components/skills/Skills';
import Experience from './components/experience/Experience';
import Language from './components/language/Language';
import Projects from './components/projects/Projects';
import { useDispatch, useSelector } from 'react-redux';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Admin from './components/admin/Admin';
import Threebackground from './components/background/Threebackground';
import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import Numbers from './components/numbers/Numbers';
import Education from './education/Education';
import axios from 'axios';
import { setUser, setshowloader, setUserBio } from './redux/features/portfolioSlice';
export default function App() {
  const { user, showloader } = useSelector((state) => state.allCart);
  const [data, setData] = useState(true);
  // const [userBio, setuserBio] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  useEffect(() => {
    if (data) {
      axios.get('https://portfoliobackend-cpj1.onrender.com/users/')
        .then(res => {
          setData(false);
          if (res.data && res.data.length > 0 && res.data[0].bio) {
            dispatch(setUser(res.data[0]));
            dispatch(setUserBio(splitSentences(res.data[0].bio)));
          } else {
            console.error('Invalid data format received from API');
          }
          dispatch(setshowloader(false));
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          dispatch(setshowloader(false));
          setData(false);
        })
    }
  }, [data, dispatch]);
  function splitSentences(bio) {
    const sentences = bio.split(/(?<=\.|\!|\?)\s+/);
    // Add a delay of 1000ms after each sentence
    return sentences.flatMap(sentence => [sentence, 1000]);
  }
  if (showloader) {
    // Display loading screen or spinner
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Animated Loader */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute w-20 h-20 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-4 border-t-transparent border-secondary rounded-full animate-spin-reverse"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold tracking-wide text-gray-300 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );

  } else {
    return (
      <main className="relative w-full overflow-hidden">
        <Threebackground />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <Navbar />
          <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
            <div className="snap-start min-h-screen w-full flex items-center">
              <HeroSection />
            </div>
            
            <div className="snap-start min-h-screen w-full flex items-center justify-center">
              <div className="w-full px-4">
                <Numbers />
              </div>
            </div>
            
            <div className="snap-start min-h-screen w-full flex items-center justify-center">
              <div className="w-full">
                <Skills />
              </div>
            </div>
            
            <div className="snap-start min-h-screen w-full">
              <Education />
            </div>
            
            <div className="snap-start min-h-screen w-full">
              <Experience />
            </div>
            
            <div className="snap-start min-h-screen w-full">
              <Projects />
            </div>
            
            <div className="snap-start min-h-screen w-full">
              <Language />
            </div>
            
            <div className="snap-start min-h-screen w-full">
              <Contact />
            </div>
          </div>
          <Footer />
        </div>
      </main>
    )
  }
}

