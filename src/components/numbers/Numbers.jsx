import React, { useState, useEffect, useRef } from 'react';

function Numbers() {
    const [projectsCount, setProjectsCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [cgpaCount, setCgpaCount] = useState(0);
    const [startCounting, setStartCounting] = useState(false);
    const ref = useRef(null);

    const animateCount = (target, setter, maxValue, speed) => {
        let current = 0;
        const increment = maxValue / speed;
        const interval = setInterval(() => {
            current += increment;
            setter(current);
            if (current >= maxValue) {
                setter(maxValue);
                clearInterval(interval);
            }
        }, 80);
    }
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                    observer.disconnect();
                }
            });
        }
            , { threshold: 0.5 });
        observer.observe(ref.current);
    }
        , [ref]);
    useEffect(() => {
        if (startCounting) {
            animateCount(projectsCount, setProjectsCount, 15, 15); // Example: 15 projects
            animateCount(experienceCount, setExperienceCount, 5, 5); // Example: 5 years experience
            animateCount(cgpaCount, setCgpaCount, 3.8, 100); // Example: CGPA of 3.8
        }
    }, [startCounting]);

    return (
        <section
            data-aos='fade-up'
            data-aos-delay='200'
            className='relative w-full flex items-center justify-center'>
                <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda] 
                via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block">
            </header>
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
                     via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block">
            </header>
            <div
                ref={ref}
                className='w-[90%] p-10 bg-gray-300 bg-opacity-50 rounded-lg text-center border border-yellow-400 rounded-lg'
                style={{ minHeight: '80px', color: 'white' }}
            >
                <div className='grid grid-cols-5 items-center gap-6'>
                    <div className='text-center'>
                        <h3 className='text-4xl font-semibold'>{projectsCount}+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className='bg-yellow-400 h-16 w-0.5 mx-auto'></div>
                    <div className='text-center'>
                        <h3 className='text-4xl font-semibold'>{experienceCount}+</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div className='bg-yellow-400 h-16 w-0.5 mx-auto'></div>
                    <div className='text-center'>
                        <h3 className='text-4xl font-semibold'>{cgpaCount.toFixed(1)}</h3>
                        <p>University CGPA</p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Numbers;