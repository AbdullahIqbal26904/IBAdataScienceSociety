import React from 'react'
import { motion } from 'framer-motion'

function SectionItem({ title, subtitle, year, details, icon }) {
    return (
        <motion.article
            className='relative flex flex-col justify-end px-2 gap-3 rounded-lg cursor-pointer before:absolute
            before:inset-[10px] before:rounded-[10px] before:bg-gradient-to-br before:from-primary before:to-secondary before:z-[-10]
            after:absolute after:inset-0 after:bg-gradient-to-br after:from-secondary after:to-primary after:scale-[0.95] after:blur-[20px]
            hover: after:blur-[30px] mt-10' 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <section
                className=" bg-black z-20 text-white rounded-xl">
                < section className="border border-primary bg-[#ffffff29] rounded-xl p-3 flex flex-col sm:flex-row items-center">
                    <img src={icon} alt="icon" className="w-16 h-16 sm:w-16 sm:h-16 mb-4 sm:mb-0" />
                    <div className="ml-0 sm:ml-10 text-center sm:text-left">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="text-sm">{subtitle}</p>
                        <p className="text-sm italic">{year}</p>
                        {details && <p className="mt-2">{details}</p>}
                    </div>
                </section>
            </section>
        </motion.article>
    )
}

export default SectionItem