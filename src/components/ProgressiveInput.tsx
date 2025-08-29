import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import { steps } from "../utils/constant";

// Load sound effect
const popSound = typeof Audio !== "undefined" ? new Audio("/pop.mp3") : null;

// Particle Confetti
const Particle = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const size = Math.random() * 6 + 4;
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 120 + 60;

  return (
    <motion.div
      initial={{ x, y, opacity: 1, scale: 1 }}
      animate={{
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        opacity: 0,
        scale: 0.5,
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
};

const ProgressiveInput = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  const triggerSound = () => {
    if (popSound) {
      popSound.currentTime = 0;
      popSound.play();
    }
  };

  const triggerParticles = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;
    const colors = ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa"];
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  };

  const handleNext = (e: React.MouseEvent) => {
    triggerSound();
    triggerParticles(e);

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    triggerSound();
    triggerParticles(e);

    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md relative h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!completed ? (
            steps.map(
              (step, index) =>
                index <= currentStep && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      y: -index * 20,
                      scale: index < currentStep ? 0.95 : 1,
                    }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`backdrop-blur-md border rounded-2xl p-5 shadow-xl absolute w-full bg-white/60 ${
                      index < currentStep ? "opacity-70" : "bg-white"
                    }`}
                    style={{ zIndex: index === currentStep ? 10 : index }}
                  >
                    <label className="block mb-2 font-medium text-black">
                      {step.label}
                    </label>
                    <input
                      type={step.type}
                      className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                      value={values[step.id] || ""}
                      onChange={(e) =>
                        setValues({ ...values, [step.id]: e.target.value })
                      }
                    />
                    {index === currentStep && (
                      <div className="flex justify-between mt-3">
                        {index > 0 && (
                          <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition relative overflow-hidden"
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition relative overflow-hidden"
                        >
                          {index === steps.length - 1 ? "Finish" : "Next"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )
            )
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>
              <h2 className="mt-4 text-xl font-semibold text-black">
                All Done!
              </h2>
              <p className="text-gray-600">You’ve completed the process 🎉</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Particles */}
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
        ))}
      </div>
    </div>
  );
};

export default ProgressiveInput;
