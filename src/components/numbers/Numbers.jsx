import React, { useState, useEffect, useRef } from 'react';

function Numbers() {
    const [projectsCount, setProjectsCount] = useState(0);
    const [experienceCount, setExperienceCount] = useState(0);
    const [cgpaCount, setCgpaCount] = useState(0);
    const [startCounting, setStartCounting] = useState(false);
    const ref = useRef(null);

    const animateCount = (setter, maxValue, speed) => {
        const increment = maxValue / speed;
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            setter(prev => {
                const newValue = prev + increment;
                if (newValue >= maxValue) {
                    clearInterval(interval);
                    return maxValue; // Ensure it caps at maxValue
                }
                return newValue;
            });
        }, 80);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStartCounting(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
    }, []);

    useEffect(() => {
        if (startCounting) {
            animateCount(setProjectsCount, 15, 30); // Example: 15 projects
            animateCount(setExperienceCount, 5, 25); // Example: 5 years experience
            animateCount(setCgpaCount, 3.27, 50); // Example: CGPA of 3.27
        }
    }, [startCounting]);

    return (
        <section
            data-aos="fade-up"
            data-aos-delay="200"
            className="relative w-full flex items-center justify-center"
        >
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda] 
                via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block">
            </header>
            <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
                     via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block">
            </header>
            <div
                ref={ref}
                className="w-[90%] p-10 bg-gray-300 bg-opacity-50 rounded-lg text-center border border-yellow-400"
                style={{ minHeight: "80px", color: "white" }}
            >
                <div className="grid grid-cols-5 items-center gap-6">
                    <div className="text-center">
                        <h3 className="text-4xl font-semibold">{Math.floor(projectsCount)}+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className="bg-yellow-400 h-16 w-0.5 mx-auto"></div>
                    <div className="text-center">
                        <h3 className="text-4xl font-semibold">{Math.floor(experienceCount)}+</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div className="bg-yellow-400 h-16 w-0.5 mx-auto"></div>
                    <div className="text-center">
                        <h3 className="text-4xl font-semibold">{cgpaCount.toFixed(2)}</h3>
                        <p>University CGPA</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Numbers;
