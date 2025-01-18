import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from '../data/config';

export default function SocialButtons() {
    const animationduration = 4;

    const variants = {
        initial: { pathLength: 0, strokeOpacity: 1, fillOpacity: 0 },
        animate: {
            pathLength: 1,
            strokeOpacity: 0,
            fillOpacity: 1,
            transition: {
                duration: animationduration,
                ease: 'easeInOut',
                strokeOpacity: {
                    delay: animationduration,
                },
                fillOpacity: {
                    delay: animationduration,
                },
            },
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                yoyo: Infinity,
            },
        },
    };

    return (
        <div className="md:flex flex-col items-center justify-center border border-primary bg-[#ffffff29] rounded-3xl space-y-11 p-3 max-h-[506px] md:max-h-[386px] hidden">
            {socialIcons.map((icon) => (
                <a
                    key={icon.id}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon.name}
                >
                    <svg viewBox={icon.viewBox} width={40} height={40}>
                        <motion.path
                            d={icon.path}
                            fill="#FFC107"
                            stroke="#FFC107"
                            strokeWidth={1}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                        />
                    </svg>
                </a>
            ))}
        </div>
    );
}
