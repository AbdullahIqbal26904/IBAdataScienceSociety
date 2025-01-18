import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomTitle from "../title/CustomTitle";

export default function Education() {
  const [education, seteducation] = useState([]);
  const { user } = useSelector((state) => state.allCart);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await axios.get(`http://localhost:3003/education/${user._id}`);
        seteducation(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && user._id) {
      fetchEducation();
    }
  }, [user]);

  return (
    <section id="education" className="relative mt-40">
      <CustomTitle
        text="My Education"
        gradient="linear-gradient(to right, #eee, #eee)"
        size="3rem"
      />
      <section className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-16 mt-12">
        <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda] 
                via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block">
        </header>
        <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
                     via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block">
        </header>

        {education && education.map((educ, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full h-[430px] p-5 grid place-items-center overflow-hidden rounded-[20px] shadow-lg"
          >

            <section className="absolute w-[95%] h-[95%] bg-[#0d182e] rounded-[20px] z-10 text-center text-white p-5 flex flex-col items-center justify-between">
              {/* Institution Header */}
              <header className="w-full border border-primary bg-[#ffffff29] rounded-xl p-3 mb-4">
                <h2 className="uppercase text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#ff6667]">
                  {educ.institution}
                </h2>
              </header>

              {/* Institute Logo */}
              <img
                src={educ.instituteimage}
                alt={`${educ.institution} logo`}
                className="w-20 h-20 rounded-full border-2 border-primary shadow-md mb-4"
              />

              {/* Degree Details */}
              <p className="text-sm md:text-base mb-2">
                <strong>Degree:</strong> {educ.degree}
              </p>

              {/* Additional Details */}
              <p className="text-sm md:text-base mb-2">
                <strong>Details:</strong> {educ.details}
              </p>

              {/* Years */}
              <p className="text-sm md:text-base mb-2">
                <strong>Years:</strong> {educ.year_of_start} - {educ.year_of_passing}
              </p>
            </section>
            <section className="absolute w-full h-[105%] bg-gradient-to-r from-[#FFC107] to-[#ff6667] animate-spin-slow "></section>
          </motion.article>
        ))}
      </section>
    </section>
  );
}