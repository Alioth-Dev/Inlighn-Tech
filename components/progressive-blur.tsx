"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"

// Progressive blur on scroll with enhanced effects
export function ProgressiveBlurSection({
  children,
  className = "",
  blurIntensity = "medium",
  direction = "both",
}: {
  children: React.ReactNode
  className?: string
  blurIntensity?: "low" | "medium" | "high"
  direction?: "up" | "down" | "both"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const blurValues = {
    low: 5,
    medium: 10,
    high: 20,
  }

  const maxBlur = blurValues[blurIntensity]

  // Create blur transform based on direction
  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    direction === "both" ? [maxBlur, 0, 0, maxBlur] : direction === "up" ? [maxBlur, 0, 0, 0] : [0, 0, 0, maxBlur],
  )

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        filter: useTransform(blur, (value) => `blur(${value}px)`),
        opacity,
      }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced modal with progressive background blur
export function BlurModal({
  isOpen,
  onClose,
  children,
  blurIntensity = "medium",
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  blurIntensity?: "low" | "medium" | "high"
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  const blurValues = {
    low: 5,
    medium: 10,
    high: 20,
  }

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setTimeout(() => setIsAnimating(false), 300)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Blurred background overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: isOpen ? `blur(${blurValues[blurIntensity]}px)` : "blur(0px)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative z-10 max-w-lg w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isOpen ? 1 : 0.9,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Progressive image loading with blur-to-sharp transition
export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholder = "/placeholder.svg?height=400&width=600",
}: {
  src: string
  alt: string
  className?: string
  placeholder?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setIsLoading(false)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blurred placeholder */}
      <motion.img
        src={placeholder}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: "blur(20px)" }}
        animate={{
          filter: isLoaded ? "blur(0px)" : "blur(20px)",
          opacity: isLoaded ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Sharp final image */}
      <motion.img
        src={src}
        alt={alt}
        className="relative w-full h-full object-cover"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onLoad={handleLoad}
      />

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </div>
  )
}

// Interactive hover blur card
export function InteractiveBlurCard({
  children,
  className = "",
  sharpenOnHover = true,
}: {
  children: React.ReactNode
  className?: string
  sharpenOnHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10"
        animate={{
          filter: sharpenOnHover && isHovered ? "contrast(1.1) brightness(1.05)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Focus blur container for highlighting specific elements
export function FocusBlurContainer({
  children,
  focusedIndex,
  className = "",
  blurIntensity = "medium",
}: {
  children: React.ReactNode[]
  focusedIndex: number | null
  className?: string
  blurIntensity?: "low" | "medium" | "high"
}) {
  const blurValues = {
    low: 2,
    medium: 5,
    high: 10,
  }

  const blurAmount = blurValues[blurIntensity]

  return (
    <div className={`relative ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          animate={{
            filter:
              focusedIndex !== null && focusedIndex !== index
                ? `blur(${blurAmount}px) brightness(0.7)`
                : "blur(0px) brightness(1)",
            scale: focusedIndex === index ? 1.02 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Scroll-triggered blur reveal
export function ScrollBlurReveal({
  children,
  className = "",
  threshold = 0.3,
}: {
  children: React.ReactNode
  className?: string
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio > threshold)
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        filter: isVisible ? "blur(0px)" : "blur(8px)",
        opacity: isVisible ? 1 : 0.6,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Loading blur transition
export function LoadingBlurTransition({
  isLoading,
  children,
  className = "",
}: {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        filter: isLoading ? "blur(3px)" : "blur(0px)",
        opacity: isLoading ? 0.7 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Click-triggered blur effect
export function ClickBlurEffect({
  children,
  className = "",
  blurDuration = 200,
}: {
  children: React.ReactNode
  className?: string
  blurDuration?: number
}) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = useCallback(() => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), blurDuration)
  }, [blurDuration])

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      animate={{
        filter: isClicked ? "blur(2px)" : "blur(0px)",
        scale: isClicked ? 0.98 : 1,
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
