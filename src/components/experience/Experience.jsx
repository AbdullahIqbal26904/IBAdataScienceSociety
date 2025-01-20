import React from 'react'
import img_experience from '../../assets/img_experience.png'
import SectionItem from './SectionItem'
import { experience } from '../data/config'
export default function Experience() {
  return (

    <section id='experience' className='relative overflow-hidden flex flex-col items-center justify-center text-gray-600 body-font mt-40'>
      <h1 data-aos='fade-up' data-aos-delay='400' className='sm:text-5xl text-3xl font-bold title-font text-gradient text-orange-500 bg-clip-text  text-center mb-12 '>Experience</h1>
      <div className='absolute top-[100px] left-64 inset-x-0 flex items-start justify-center'>
        <div className='h-96 w-96 bg-gradient-to-br from-[#ff910a] blur-2xl invisible opacity-40 rounded-full'></div>
        <div className='h-96 w-96 bg-gradient-to-r from-[#ffdb12] opacity-40 blur-2xl rounded-full'></div>
      </div>
      <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
        <div data-aos='fade-right' data-aos-delay='400' className='relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0'>
          <div className='md:h-[450px] h-[400px] md:w-[300px] w-[300px] md:right-36 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-400 absolute rounded-md transform rotate-3 -top-8 shadow-[0_0_40px_rgba(225,165,0,0.7)] z-0'></div>
          <img src={img_experience} className='object-cover md:w-[300px] md:h-[450px] object-center rounded relative z-10' alt="Experience" />
        </div>
        <div data-aos='fade-left' data-aos-delay='400' className='lg:flex-grow md:w-1/2 lg:pl-8 md:pl-8 flex flex-col md:items-start md:text-left items-center text-center '>
          <section className="relative container mx-auto px-4 py-12 lg:p-16">
            <section className="flex flex-col items-center justify-center">
              {experience.map((exp) => (
                <SectionItem key={exp.id}
                  title={exp.title}
                  subtitle={exp.company}
                  year={exp.year}
                  details={exp.description}
                  icon={exp.icon}
                />
              ))}
            </section>
          </section>

        </div>
      </div >
    </section >

  )
}
