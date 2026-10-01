'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion'

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    />
  )
}

export const LiveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%">
            <stop offset="0" stopColor="#F3F4F6"/>
            <stop offset="1" stopColor="#E5E7EB"/>
          </linearGradient>
          <pattern id="b" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle fill="#4B5563" cx="12" cy="12" r="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#a)"/>
        <rect width="100%" height="100%" fill="url(#b)" fillOpacity="0.1"/>
      </svg>
    </div>
  )
}

export const LoadingSpinner = () => {
  const stars = [
    { x: "10%", y: "20%", size: 2, delay: 0 },
    { x: "20%", y: "70%", size: 3, delay: 0.5 },
    { x: "30%", y: "35%", size: 2, delay: 1 },
    { x: "42%", y: "15%", size: 3, delay: 1.5 },
    { x: "55%", y: "75%", size: 2, delay: 0.3 },
    { x: "68%", y: "25%", size: 3, delay: 0.8 },
    { x: "78%", y: "60%", size: 2, delay: 1.2 },
    { x: "88%", y: "18%", size: 3, delay: 0.4 },
    { x: "92%", y: "78%", size: 2, delay: 1.7 },
    { x: "15%", y: "45%", size: 2, delay: 1.1 },
    { x: "75%", y: "40%", size: 2, delay: 0.7 },
    { x: "50%", y: "45%", size: 2, delay: 1.4 },
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950">
      {/* Background glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: star.x,
            top: star.y,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main loader */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">

          {/* Moon */}
          <motion.div
            className="relative h-28 w-28"
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Moon */}
            <div className="absolute left-4 top-2 h-24 w-24 rounded-full bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-[0_0_50px_rgba(255,255,255,0.25)]" />

            {/* Moon cutout */}
            <div className="absolute left-10 top-0 h-24 w-24 rounded-full bg-slate-950" />

            {/* Moon craters */}
            <div className="absolute left-8 top-14 h-3 w-3 rounded-full bg-slate-300/60" />
            <div className="absolute left-16 top-20 h-2 w-2 rounded-full bg-slate-300/50" />
            <div className="absolute left-14 top-7 h-2 w-2 rounded-full bg-slate-400/50" />
          </motion.div>

          {/* Small orbiting star */}
          <motion.div
            className="absolute left-0 top-3 text-yellow-200"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.span
              className="text-2xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.span>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold tracking-[0.3em] text-white">
              LOADING
            </h2>

            <motion.div
              className="mt-3 flex justify-center gap-1"
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-white"
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: dot * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}