import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../utils/constant";

const PageTransition = () => {
    const [selected, setSelected] = useState<null | number>(null);
  
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
        <AnimatePresence>
          {selected === null ? (
            content.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => setSelected(index)}
                className="w-72 h-96 bg-white shadow-xl rounded-2xl cursor-pointer overflow-hidden flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-blue-700">
                      {item.title}
                    </h2>
                    <h3 className="text-sm text-gray-500">{item.subtitle}</h3>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {item.preview}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="expanded"
              className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8"
            initial={{ clipPath: "circle(0% at 0% 0%)" }} 
            animate={{ clipPath: "circle(150% at 0% 0%)" }}
            exit={{ clipPath: "circle(0% at 0% 0%)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={content[selected].image}
                alt={content[selected].title}
                className="w-full max-h-96 object-cover rounded-2xl shadow-md"
              />
              <h2 className="text-3xl font-bold text-blue-800 mt-6">
                {content[selected].title}
              </h2>
              <h3 className="text-lg text-gray-500 mb-4">
                {content[selected].subtitle}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed max-w-3xl whitespace-pre-line">
                {content[selected].body}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default PageTransition;
