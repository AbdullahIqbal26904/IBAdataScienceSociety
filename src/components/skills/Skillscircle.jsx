import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Skillscircle({ skill }) {
  const { name, proficiency, skillimage } = skill;
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate percentage when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPercentage((prev) =>
        prev < proficiency ? prev + 1 : proficiency
      );
    }, 40);

    return () => clearInterval(interval);
  }, [proficiency]);

  // Calculate color based on proficiency
  const getColor = () => {
    if (proficiency >= 90) return { from: '#FFD700', to: '#FF8C00' }; // Gold to Orange for expert
    if (proficiency >= 70) return { from: '#FFC107', to: '#FF6B6B' }; // Primary to Reddish for advanced
    if (proficiency >= 50) return { from: '#4CAF50', to: '#8BC34A' }; // Green for intermediate
    return { from: '#2196F3', to: '#03A9F4' }; // Blue for beginner
  };
  
  const colors = getColor();

  return (
    <motion.div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3 text-center">
        <h3 className="text-lg font-medium text-white">{name}</h3>
      </div>
      
      <div className="relative">
        {/* Skill Circle with animated gradient border */}
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              ${colors.from} ${currentPercentage}%,
              rgba(255, 255, 255, 0.1) ${currentPercentage}%
            )`,
          }}
        >
          {/* Animated glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isHovered 
                ? `0 0 15px 2px ${colors.from}` 
                : `0 0 0px 0px ${colors.from}`
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Inner circle */}
          <div className="bg-black/80 backdrop-blur-sm absolute w-28 h-28 rounded-full flex flex-col items-center justify-center">
            {/* Skill image with hover zoom */}
            <motion.div
              className="w-16 h-16 rounded-full overflow-hidden bg-white/5 p-1"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={skillimage}
                alt={name}
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
            
            {/* Percentage display */}
            <div className="text-xl font-bold mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r" 
                style={{backgroundImage: `linear-gradient(to right, ${colors.from}, ${colors.to})`}}>
                {currentPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Skillscircle;
