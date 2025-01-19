import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Skills from './components/skills/Skills';
import Experience from './components/experience/Experience';
import Language from './components/language/Language';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Admin from './components/admin/Admin';
import Threebackground from './components/background/Threebackground';
import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import Numbers from './components/numbers/Numbers';
import Education from './education/Education';
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <main className=''>
      {/* 
    
    <Skills />
    <Experience />
    <Language />
    <Projects />
    <Contact />
    <Footer /> */}
      <Threebackground />
      <div className='flex flex-col items-center gap-[12rem]'>
        <Navbar />
        <HeroSection />
        <Numbers />
        <Skills />
      </div>
        <Education />
      <Experience />
      <Projects />
      <Language />
      <Contact />

      <Footer />
      {/* <Admin /> */}
    </main>
  )
}

