import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYou: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { yoyo: Infinity } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-40 h-40 mb-6" style={{ display: "grid", placeItems: "center" }}>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 bg-yellow-300 rounded-full blur-md"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        variants={textVariants}
      >
        Thank You!
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 text-center"
        variants={textVariants}
      >
        Your order has been placed successfully. We appreciate your business!
      </motion.p>

      <motion.div variants={buttonVariants}>
        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ThankYou;
