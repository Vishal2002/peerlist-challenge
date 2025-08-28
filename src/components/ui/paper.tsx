import { motion } from "motion/react";

const getArcTransform = (index: number, total: number) => {
  const spread = 80; // arc angle
  const step = spread / (total - 1);
  const angle = -spread / 2 + index * step;
  return { angle };
}

export const Paper = ({
    paper,
    index,
    total,
    isHovered,
    hoveredPaper,
    selectedPaper,
    setHoveredPaper,
    setSelectedPaper,
  }: any) => {
    const { angle } = getArcTransform(index, total);
    const active = selectedPaper === paper.id || hoveredPaper === paper.id;
  
    const animate = active
      ? {
          translateZ: 20,
          translateX: Math.sin((angle * Math.PI) / 180) * 80,
          translateY: -Math.cos((angle * Math.PI) / 180) * 40 - 20,
          rotateZ: angle,
          scale: 1.1,
          opacity: 1,
        }
      : isHovered
      ? {
          translateZ: index * 4,
          translateX: Math.sin((angle * Math.PI) / 180) * 60,
          translateY: -Math.cos((angle * Math.PI) / 180) * 30,
          rotateZ: angle,
          opacity: 0.95,
        }
      : {
          translateZ: index * 1,
          translateX: index * 2,
          translateY: index * 1,
          rotateZ: 0,
          opacity: 0.7,
        };
  
    return (
      <motion.div
        key={paper.id}
        className={`absolute w-32 h-24 ${paper.color} rounded shadow-lg border border-gray-200 cursor-pointer`}
        style={{ left: "4px", top: "4px", zIndex: total - index }}
        animate={animate}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        onMouseEnter={() => setHoveredPaper(paper.id)}
        onMouseLeave={() => {
          if (selectedPaper !== paper.id) setHoveredPaper(null);
        }}
        onClick={() => setSelectedPaper(paper.id)}
      >
        {/* Paper Content */}
        <div className="relative w-full h-full p-2 overflow-hidden">
          <div className="space-y-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-0.5 bg-gray-300 rounded"
                style={{
                  width: ["75%", "100%", "83%", "80%"][i] || "80%",
                  opacity: 0.3 + i * 0.1,
                }}
              />
            ))}
          </div>
  
          <div
            className="absolute top-0 right-0 w-3 h-3 bg-gray-200 border-l border-b border-gray-300"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
  
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredPaper === paper.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center p-1">
              <div className={`text-xs font-semibold ${paper.textColor}`}>
                {paper.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">Click to view</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };