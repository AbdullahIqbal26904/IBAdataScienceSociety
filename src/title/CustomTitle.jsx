import React from 'react';
import { motion } from 'framer-motion';

function CustomTitle({ text, gradient = '', size = '2rem', animation = {} }) {
  const defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  };

  return (
    <motion.div
      {...defaultAnimation}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        fontSize: size,
        fontWeight: 'bold',
        textAlign: 'center',
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {text}
    </motion.div>
  );
}

export default CustomTitle;
