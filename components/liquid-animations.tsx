"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Enhanced Liquid button component with morphing effects
export function LiquidButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "accent" | "gradient"
  size?: "sm" | "md" | "lg"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { id: Date.now(), x, y }
    setRipples((prev) => [...prev, newRipple])

    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)

    onClick?.()
  }

  const variants = {
    primary: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    secondary: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    accent: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    gradient: "from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg text-white font-semibold transition-all duration-300 ${sizes[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: `linear-gradient(45deg, var(--tw-gradient-stops))`,
      }}
    >
      {/* Base gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${variants[variant]} transition-all duration-300`} />

      {/* Liquid morphing background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${isHovered ? "50%" : "0%"} ${isHovered ? "50%" : "0%"}, 
                      rgba(255,255,255,0.3) 0%, 
                      rgba(255,255,255,0.1) 40%, 
                      transparent 70%)`,
        }}
        animate={{
          scale: isHovered ? 1.2 : 0.8,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Flowing liquid wave effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%", skewX: -15 }}
        animate={{
          x: isHovered ? "100%" : "-100%",
          skewX: isHovered ? 15 : -15,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          repeatDelay: 1,
        }}
      />

      {/* Click ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Liquid blob morphing on hover */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          borderRadius: isHovered
            ? ["50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%", "50% 50% 50% 50%"]
            : "8px",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
        }}
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Advanced liquid loader with multiple blob interactions
export function LiquidLoader({
  size = 80,
  variant = "default",
}: { size?: number; variant?: "default" | "pulse" | "morph" | "wave" }) {
  const variantConfigs = {
    default: {
      colors: ["#3b82f6", "#06b6d4", "#8b5cf6"],
      animation: "bounce",
    },
    pulse: {
      colors: ["#10b981", "#34d399", "#6ee7b7"],
      animation: "pulse",
    },
    morph: {
      colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
      animation: "morph",
    },
    wave: {
      colors: ["#ef4444", "#f87171", "#fca5a5"],
      animation: "wave",
    },
  }

  const config = variantConfigs[variant]

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Main liquid blob */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${config.colors[0]}, ${config.colors[1]})`,
          }}
          animate={
            config.animation === "bounce"
              ? {
                  scale: [1, 1.2, 1],
                  borderRadius: ["50%", "40%", "50%"],
                }
              : config.animation === "pulse"
                ? {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }
                : config.animation === "morph"
                  ? {
                      borderRadius: [
                        "50% 50% 50% 50%",
                        "60% 40% 60% 40%",
                        "40% 60% 40% 60%",
                        "30% 70% 30% 70%",
                        "50% 50% 50% 50%",
                      ],
                      scale: [1, 1.1, 0.9, 1.1, 1],
                    }
                  : {
                      y: [0, -10, 0, 10, 0],
                      x: [0, 5, 0, -5, 0],
                    }
          }
          transition={{
            duration: config.animation === "wave" ? 3 : 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Secondary blob */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-70"
          style={{
            background: `linear-gradient(135deg, ${config.colors[1]}, ${config.colors[2]})`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            borderRadius: ["40%", "50%", "40%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              background: config.colors[i % config.colors.length],
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Inner highlight */}
        <motion.div
          className="absolute top-2 left-2 w-6 h-6 bg-white/40 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            x: [0, 5, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

// Liquid background with flowing effects
export function LiquidBackground({
  children,
  variant = "default",
  intensity = "medium",
}: {
  children: React.ReactNode
  variant?: string
  intensity?: "low" | "medium" | "high"
}) {
  const variantConfigs = {
    default: {
      colors: [
        "from-blue-500/20 to-cyan-500/20",
        "from-purple-500/20 to-pink-500/20",
        "from-green-500/20 to-emerald-500/20",
      ],
      blur: "blur-3xl",
    },
    ocean: {
      colors: ["from-blue-600/30 to-cyan-400/30", "from-teal-500/25 to-blue-500/25", "from-cyan-400/20 to-blue-600/20"],
      blur: "blur-2xl",
    },
    lava: {
      colors: [
        "from-red-500/25 to-orange-500/25",
        "from-orange-600/30 to-red-600/30",
        "from-yellow-500/20 to-red-500/20",
      ],
      blur: "blur-3xl",
    },
    aurora: {
      colors: [
        "from-purple-500/25 to-pink-500/25",
        "from-green-400/20 to-purple-500/20",
        "from-blue-500/25 to-green-400/25",
      ],
      blur: "blur-2xl",
    },
  }

  // Ensure we always have a valid config
  const config = variantConfigs[variant as keyof typeof variantConfigs] || variantConfigs.default
  const intensityMultiplier = intensity === "low" ? 0.5 : intensity === "high" ? 1.5 : 1

  return (
    <div className="relative overflow-hidden">
      {/* Animated liquid shapes */}
      <div className="absolute inset-0 opacity-60">
        {/* Primary blob */}
        <motion.div
          className={`absolute w-96 h-96 bg-gradient-to-r ${config.colors[0]} rounded-full ${config.blur}`}
          style={{
            left: "-10%",
            top: "-10%",
          }}
          animate={{
            x: [0, 100 * intensityMultiplier, 0],
            y: [0, 50 * intensityMultiplier, 0],
            scale: [1, 1.2, 1],
            borderRadius: ["50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%", "50% 50% 50% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Secondary blob */}
        <motion.div
          className={`absolute w-80 h-80 bg-gradient-to-r ${config.colors[1]} rounded-full ${config.blur}`}
          style={{
            right: "-10%",
            bottom: "-10%",
          }}
          animate={{
            x: [0, -80 * intensityMultiplier, 0],
            y: [0, -60 * intensityMultiplier, 0],
            scale: [1.2, 1, 1.2],
            borderRadius: ["40% 60% 40% 60%", "50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Tertiary blob */}
        <motion.div
          className={`absolute w-64 h-64 bg-gradient-to-r ${config.colors[2]} rounded-full ${config.blur}`}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [-50 * intensityMultiplier, 50 * intensityMultiplier, -50 * intensityMultiplier],
            y: [-30 * intensityMultiplier, 30 * intensityMultiplier, -30 * intensityMultiplier],
            scale: [1, 1.3, 1],
            borderRadius: ["50% 50% 50% 50%", "30% 70% 30% 70%", "70% 30% 70% 30%", "50% 50% 50% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-16 bg-gradient-to-r ${config.colors[i % config.colors.length]} rounded-full ${config.blur} opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200 * intensityMultiplier],
              y: [0, (Math.random() - 0.5) * 200 * intensityMultiplier],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Liquid card with hover morphing effects
export function LiquidCard({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "glow" | "wave" | "morph"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
    >
      {/* Liquid wave effect on hover */}
      {variant === "wave" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/30 to-purple-500/20"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Glow effect following mouse */}
      {variant === "glow" && (
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                        rgba(59, 130, 246, 0.3) 0%, 
                        rgba(59, 130, 246, 0.1) 40%, 
                        transparent 70%)`,
          }}
        />
      )}

      {/* Morphing border effect */}
      {variant === "morph" && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-500/50"
          animate={{
            borderRadius: isHovered ? ["8px", "20px 8px 20px 8px", "8px 20px 8px 20px", "8px"] : "8px",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Default liquid ripple */}
      {variant === "default" && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        transparent 50%)`,
          }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Liquid transition component for page/section transitions
export function LiquidTransition({
  isVisible,
  direction = "up",
  color = "blue",
  onComplete,
}: {
  isVisible: boolean
  direction?: "up" | "down" | "left" | "right"
  color?: "blue" | "purple" | "green" | "red"
  onComplete?: () => void
}) {
  const colors = {
    blue: "from-blue-600 to-cyan-600",
    purple: "from-purple-600 to-pink-600",
    green: "from-green-600 to-emerald-600",
    red: "from-red-600 to-orange-600",
  }

  const directions = {
    up: { initial: { y: "100%" }, animate: { y: "0%" }, exit: { y: "-100%" } },
    down: { initial: { y: "-100%" }, animate: { y: "0%" }, exit: { y: "100%" } },
    left: { initial: { x: "100%" }, animate: { x: "0%" }, exit: { x: "-100%" } },
    right: { initial: { x: "-100%" }, animate: { x: "0%" }, exit: { x: "100%" } },
  }

  return (
    <motion.div
      className={`fixed inset-0 z-50 bg-gradient-to-br ${colors[color]}`}
      initial={directions[direction].initial}
      animate={isVisible ? directions[direction].animate : directions[direction].exit}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (!isVisible && onComplete) {
          onComplete()
        }
      }}
    >
      {/* Liquid blob overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.1, 0.3, 0.1],
              borderRadius: ["50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%", "50% 50% 50% 50%"],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Liquid scroll indicator
export function LiquidScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
        style={{ width: `${scrollProgress}%` }}
        animate={{
          borderRadius: scrollProgress > 0 ? ["0%", "50%", "0%"] : "0%",
        }}
        transition={{
          duration: 2,
          repeat: scrollProgress > 0 && scrollProgress < 100 ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
      />

      {/* Liquid droplet at the end */}
      {scrollProgress > 5 && (
        <motion.div
          className="absolute top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          style={{ left: `${scrollProgress}%`, transform: "translateX(-50%)" }}
          animate={{
            scale: [1, 1.2, 1],
            y: [0, 2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  )
}

// Liquid input field with flowing border
export function LiquidInput({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: string
  className?: string
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          background: isFocused
            ? "linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
            : "linear-gradient(45deg, #e5e7eb, #e5e7eb)",
          backgroundSize: isFocused ? "300% 300%" : "100% 100%",
        }}
        style={{
          backgroundPosition: isFocused ? "0% 50%" : "0% 0%",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: isFocused ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 0%",
          }}
          transition={{
            duration: 3,
            repeat: isFocused ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-lg"
          style={{
            background: isFocused ? "linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)" : "transparent",
            backgroundSize: "300% 300%",
          }}
        />
      </motion.div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none transition-all duration-300"
        style={{
          margin: "2px",
        }}
      />
    </div>
  )
}
