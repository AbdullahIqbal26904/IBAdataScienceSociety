import { delay } from "framer-motion";
import React, { useEffect, useState } from "react";

function Skillscircle({ skill }) {
  const { name, proficiency, skillimage } = skill;

  const [currentPercentage, setCurrentPercentage] = useState(0); // Start at 0%

  // Animate percentage immediately after the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPercentage((prev) =>
        prev < proficiency ? prev + 1 : proficiency // Stop at target percentage
      );
    }, 80); // Adjust speed of animation here

    return () => clearInterval(interval); // Cleanup interval
  }, [proficiency]);

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className="relative w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(
            #FFA000 ${currentPercentage}%,
            #ddd ${currentPercentage}%
          )`,
        }}
      >
        {/* Inner circle */}
        <div className="bg-[#0d182e] absolute w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg">
          {/* Skill image */}
          <div
            className="w-16 h-16 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${skillimage})`,
            }}
          />
          {/* Percentage display */}
          <div className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            {currentPercentage}%
          </div>

        </div>
      </div>
    </div>
  );
}

export default Skillscircle;
