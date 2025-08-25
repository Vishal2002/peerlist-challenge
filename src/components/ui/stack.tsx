import { motion } from "motion/react"

interface stackProps {
  items: { id: number; name: string; avatar: string }[]
}

const Stack = ({ items }: stackProps) => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariant = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      rotate: Math.random() * 720 - 360,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
        mass: 0.8,
      },
    },
  } as const

  return (
    <motion.div className="flex" variants={container} initial="hidden" animate="visible">
      <div className="flex -space-x-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative cursor-pointer group"
            variants={itemVariant}
            whileHover={{ y: -8, scale: 1.1, zIndex: 30 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Avatar */}
            <motion.img
              src={item.avatar}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.15 + 1.5, // Wait for particles to settle
                duration: 0.5,
              }}
            />

            {/* Tooltip */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 origin-top bg-gray-600 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-40"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {item.name}
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                           border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                delay: index * 0.15 + 1.2,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {[...Array(190)].map((_, i) => {
                // Generate random starting positions in a wider radius
                const startX = (Math.random() - 0.5) * 800
                const startY = (Math.random() - 0.5) * 800
                const particleSize = Math.random() * 6 + 1

                return (
                  <motion.span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${particleSize}px`,
                      height: `${particleSize}px`,
                      backgroundColor: `hsl(${Math.random() * 20 + 20}, ${Math.random() * 20 + 10}%, ${Math.random() * 30 + 40}%)`, 
                      boxShadow: `0 0 ${particleSize * 2}px rgba(255, 215, 0, 0.6)`,
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{
                      x: startX,
                      y: startY,
                      opacity: 0.8,
                      scale: 0.5,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 64, 
                      y: (Math.random() - 0.5) * 64,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: index * 0.15 + Math.random() * 0.8, // Staggered timing
                    }}
                  />
                )
              })}
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray400 pointer-events-none"
              initial={{
                opacity: 0,
                scale: 3,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [3, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                delay: index * 0.15,
                duration: 1.8,
                ease: "easeOut",
                times: [0, 0.5, 1],
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full bg-gray-200 pointer-events-none"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: [0, 0.3, 0], scale: [1, 1.1, 1] }}
              transition={{
                delay: index * 0.15 + 1.2,
                duration: 1,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Stack
