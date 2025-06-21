"use client"

import type React from "react"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Animated Text Component with multiple effects
export function KineticText({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.8,
  className = "",
  trigger = "inView",
  stagger = 0.05,
  repeat = false,
}: {
  children: React.ReactNode
  variant?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "rotate"
    | "bounce"
    | "wave"
    | "typewriter"
    | "morphing"
    | "elastic"
    | "glitch"
  delay?: number
  duration?: number
  className?: string
  trigger?: "inView" | "hover" | "load" | "scroll"
  stagger?: number
  repeat?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: !repeat })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  // Convert children to string safely
  const text = typeof children === "string" ? children : String(children)
  const words = text.split(" ")
  const letters = text.split("")

  useEffect(() => {
    if (trigger === "inView" && isInView) {
      controls.start("visible")
    } else if (trigger === "load") {
      controls.start("visible")
    }
  }, [isInView, controls, trigger])

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -180 },
      visible: { opacity: 1, rotate: 0 },
    },
    bounce: {
      hidden: { opacity: 0, y: -100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.6,
          duration: duration,
        },
      },
    },
    elastic: {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
          duration: duration,
        },
      },
    },
  }

  // Word-based animations
  if (variant === "wave" || variant === "morphing") {
    return (
      <motion.div
        ref={ref}
        className={`inline-flex flex-wrap ${className}`}
        onMouseEnter={() => trigger === "hover" && setIsHovered(true)}
        onMouseLeave={() => trigger === "hover" && setIsHovered(false)}
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="inline-block mr-2"
            initial="hidden"
            animate={
              (trigger === "inView" && isInView) || (trigger === "hover" && isHovered) || trigger === "load"
                ? "visible"
                : "hidden"
            }
            variants={
              variant === "wave"
                ? {
                    hidden: { y: 0 },
                    visible: {
                      y: [-10, 0],
                      transition: {
                        duration: 0.6,
                        delay: delay + wordIndex * stagger,
                        repeat: repeat ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                      },
                    },
                  }
                : {
                    hidden: {
                      rotateX: 0,
                      scale: 1,
                    },
                    visible: {
                      rotateX: [0, 360, 0],
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 0.8,
                        delay: delay + wordIndex * stagger,
                        repeat: repeat ? Number.POSITIVE_INFINITY : 0,
                      },
                    },
                  }
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  // Letter-based animations
  if (variant === "typewriter" || variant === "glitch") {
    return (
      <motion.div
        ref={ref}
        className={`inline-block ${className}`}
        onMouseEnter={() => trigger === "hover" && setIsHovered(true)}
        onMouseLeave={() => trigger === "hover" && setIsHovered(false)}
      >
        {variant === "typewriter" ? (
          <motion.span
            initial={{ width: 0 }}
            animate={
              (trigger === "inView" && isInView) || (trigger === "hover" && isHovered) || trigger === "load"
                ? { width: "auto" }
                : { width: 0 }
            }
            transition={{ duration: duration, delay }}
            className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-current"
          >
            {children}
          </motion.span>
        ) : (
          letters.map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial="hidden"
              animate={
                (trigger === "inView" && isInView) || (trigger === "hover" && isHovered) || trigger === "load"
                  ? "visible"
                  : "hidden"
              }
              variants={{
                hidden: {
                  opacity: 0,
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    delay: delay + letterIndex * stagger,
                  },
                },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))
        )}
      </motion.div>
    )
  }

  // Standard animations
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      onMouseEnter={() => trigger === "hover" && setIsHovered(true)}
      onMouseLeave={() => trigger === "hover" && setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}

// Morphing Text Component
export function MorphingText({
  texts,
  interval = 3000,
  className = "",
  variant = "fadeIn",
}: {
  texts: string[]
  interval?: number
  className?: string
  variant?: "fadeIn" | "slideUp" | "scale" | "rotate"
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 },
    },
    rotate: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
    },
  }

  return (
    <div className={`relative ${className}`}>
      <motion.span
        key={currentIndex}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[variant]}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {texts[currentIndex]}
      </motion.span>
      {/* Invisible text for layout */}
      <span className="invisible">{texts[0]}</span>
    </div>
  )
}

// Scroll-triggered Text Animation
export function ScrollKineticText({
  children,
  className = "",
}: {
  children: string
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const words = children.split(" ")

  return (
    <div ref={ref} className={`${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  color: ["#6b7280", "#3b82f6", "#6b7280"],
                }
              : { opacity: 0.3, scale: 0.8 }
          }
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            repeat: isInView ? 1 : 0,
            repeatType: "reverse",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Interactive Text Component
export function InteractiveKineticText({
  children,
  className = "",
  hoverEffect = "bounce",
}: {
  children: React.ReactNode
  className?: string
  hoverEffect?: "bounce" | "shake" | "glow" | "stretch" | "rotate"
}) {
  const text = typeof children === "string" ? children : String(children)
  const letters = text.split("")

  const hoverVariants = {
    bounce: {
      y: [-5, 0],
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    shake: {
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.4 },
    },
    glow: {
      textShadow: [
        "0 0 0px rgba(59, 130, 246, 0)",
        "0 0 20px rgba(59, 130, 246, 0.8)",
        "0 0 0px rgba(59, 130, 246, 0)",
      ],
      transition: { duration: 0.6 },
    },
    stretch: {
      scaleX: [1, 1.2, 1],
      transition: { duration: 0.4 },
    },
    rotate: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-pointer"
          whileHover={hoverVariants[hoverEffect]}
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}

// Counting Animation Component
export function CountingText({
  end,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
}: {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  )
}

// Highlight Text Component
export function HighlightText({
  children,
  highlightColor = "bg-blue-500/20",
  className = "",
  delay = 0,
}: {
  children: string
  highlightColor?: string
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        className={`absolute inset-0 ${highlightColor} -skew-x-12`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}
