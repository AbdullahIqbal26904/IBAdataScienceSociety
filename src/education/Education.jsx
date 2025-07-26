import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomTitle from "../title/CustomTitle";

export default function Education() {
  const [education, seteducation] = useState([]);
  const { user } = useSelector((state) => state.allCart);
const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await axios.get(`https://portfoliobackend-cpj1.onrender.com/education/${user._id}`);
        seteducation(data.data);
        setLoading(false); 
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && user._id) {
      fetchEducation();
    }
  }, [user]);
  if (loading) {
    // Display loading screen or spinner
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
  return (
    <section id="education" className="relative py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute w-3/4 aspect-square rounded-full bg-gradient-to-br from-primary to-[#ff6667] blur-[120px] -right-1/3 -top-1/2"
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
            My Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {education && education.map((educ, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative group"
            >
              <motion.div 
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-gradient-to-br from-[#11182b] to-[#0d182e] rounded-2xl overflow-hidden h-full"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 p-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-spin-slow rounded-2xl"></div>
                </div>
                
                <div className="relative backdrop-blur-sm p-6 h-full z-10">
                  <div className="flex flex-col h-full">
                    {/* Top section with institution name */}
                    <div className="mb-6 flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary mr-4 flex-shrink-0">
                        <img
                          src={educ.instituteimage}
                          alt={`${educ.institution} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
                          {educ.institution}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {educ.year_of_start} - {educ.year_of_passing}
                        </p>
                      </div>
                    </div>
                    
                    {/* Degree info */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <h4 className="text-white font-medium mb-1">Degree</h4>
                      <p className="text-gray-300">{educ.degree}</p>
                    </div>
                    
                    {/* Details */}
                    <div className="bg-white/5 rounded-xl p-4 flex-grow">
                      <h4 className="text-white font-medium mb-1">Details</h4>
                      <p className="text-gray-300 text-sm">{educ.details}</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-70"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}