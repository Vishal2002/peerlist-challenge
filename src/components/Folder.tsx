import { useState } from "react";
import { papers } from "../utils/constant";
import { motion} from "framer-motion";
import { Paper } from "./ui/paper";
// ---------- Variants ----------
const folderVariants = {
  initial: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: { rotateX: -25, rotateY: 25, scale: 1.1 },
};

const tabVariants = {
  initial: { translateZ: 2, rotateX: 0 },
  hover: { translateZ: 6, rotateX: -8 },
};

const frontVariants = {
  initial: { rotateX: 0, translateZ: 0 },
  hover: { rotateX: -28, translateZ: 4 },
};

const shadowVariants = {
  initial: { width: 160, height: 32, opacity: 0.15 },
  hover: { width: 240, height: 48, opacity: 0.25 },
};

// ---------- Folder Component ----------
const Folder = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPaper, setHoveredPaper] = useState<any | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-8">
      <div className="relative" style={{ perspective: "1200px" }}>
        <motion.div
          className="relative cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          variants={folderVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Shadow */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
            variants={shadowVariants}
            transition={{ duration: 0.6 }}
          />

          {/* Back Panel */}
          <div
            className="absolute w-40 h-32 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg shadow-xl border border-yellow-600/20"
            style={{ transform: "translateZ(-12px)" }}
          />

          {/* Papers */}
          <div
            className="absolute inset-0 w-40 h-32"
            style={{
              transformStyle: "preserve-3d",
              clipPath: hoveredPaper ? "none" : "inset(8px 4px 8px 4px)",
            }}
          >
            {papers.map((paper, i) => (
              <Paper
                key={paper.id}
                paper={paper}
                index={i}
                total={papers.length}
                isHovered={isHovered}
                hoveredPaper={hoveredPaper}
                selectedPaper={selectedPaper}
                setHoveredPaper={setHoveredPaper}
                setSelectedPaper={setSelectedPaper}
              />
            ))}
          </div>

          {/* Folder Tab */}
          <motion.div
            className="absolute -top-4 left-8 w-16 h-8 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg shadow-lg border border-yellow-600/20"
            variants={tabVariants}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.7 }}
          />

          {/* Front Panel */}
          <motion.div
            className="relative w-40 h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl flex items-end px-4 pb-4 overflow-hidden border border-yellow-600/30"
            variants={frontVariants}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.7 }}
            style={{ transformOrigin: "bottom" }}
          >
            <div className="text-yellow-900 font-bold text-sm tracking-wider drop-shadow-sm">
              Docs
            </div>
          </motion.div>

          {/* Paper count */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
            animate={isHovered ? { scale: 1.1, backgroundColor: "#22d3ee" } : {}}
            transition={{ duration: 0.4 }}
          >
            {papers.length}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Folder;
