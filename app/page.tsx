"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Shield, TrendingUp, Users, Award, Rocket, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HeroSkeleton } from "@/components/loading-skeletons"
import { ProgressiveBlurSection, InteractiveBlurCard, ScrollBlurReveal } from "@/components/progressive-blur"

const programs = [
  {
    title: "Cybersecurity",
    description: "Master ethical hacking, penetration testing, and security protocols",
    icon: Shield,
    color: "bg-red-500",
    duration: "12 weeks",
    level: "Intermediate",
  },
  {
    title: "Full Stack Development",
    description: "Build end-to-end web applications with modern technologies",
    icon: Code,
    color: "bg-blue-500",
    duration: "16 weeks",
    level: "Beginner",
  },
  {
    title: "Data Science",
    description: "Analyze complex data and build predictive models",
    icon: TrendingUp,
    color: "bg-green-500",
    duration: "14 weeks",
    level: "Intermediate",
  },
  {
    title: "Data Analysis",
    description: "Transform raw data into actionable business insights",
    icon: Database,
    color: "bg-purple-500",
    duration: "10 weeks",
    level: "Beginner",
  },
]

const stats = [
  { number: "5000+", label: "Successful Interns" },
  { number: "95%", label: "Job Placement Rate" },
  { number: "50+", label: "Partner Companies" },
  { number: "4.9/5", label: "Average Rating" },
]

const features = [
  {
    icon: Rocket,
    title: "Industry-Ready Skills",
    description: "Learn cutting-edge technologies used by top companies worldwide",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals with years of experience",
  },
  {
    icon: Award,
    title: "Guaranteed Placement",
    description: "95% job placement rate with our extensive partner network",
  },
]

// Simple Kinetic Text Component
function AnimatedText({
  children,
  delay = 0,
  className = "",
}: { children: string; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Morphing Text Component - Enhanced with better visibility
function MorphingText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [texts.length])

  return (
    <div className={`relative ${className}`}>
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {texts[currentIndex]}
      </motion.span>
      {/* Fallback for browsers that don't support gradient text */}
      <span className="invisible font-bold text-blue-600 dark:text-blue-400" aria-hidden="true">
        {texts[0]}
      </span>
    </div>
  )
}

// Counting Animation
function CountingNumber({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true)
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * end)
        setCount(currentCount)
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, hasStarted])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const morphingTexts = ["Tech Career", "Future Success", "Dream Job", "Innovation"]
  const [loadingStage, setLoadingStage] = useState(0)

  useEffect(() => {
    const stages = [
      { delay: 800, stage: 1 }, // Hero loads
      { delay: 1500, stage: 2 }, // Stats load
      { delay: 2200, stage: 3 }, // Programs load
      { delay: 2800, stage: 4 }, // Features load
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    setTimeout(() => setIsLoading(false), 3200)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
            Loading amazing experiences...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        {loadingStage < 1 ? (
          <div className="container mx-auto px-4 py-20">
            <HeroSkeleton />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400">
                      🚀 Next-Gen Tech Education
                    </Badge>
                  </motion.div>

                  <div className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                    <AnimatedText delay={0.2}>Launch Your</AnimatedText>
                    <div className="relative">
                      <MorphingText texts={morphingTexts} className="block min-h-[1.2em]" />
                      {/* Additional fallback */}
                      <noscript>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">Tech Career</span>
                      </noscript>
                    </div>
                  </div>

                  <AnimatedText delay={0.6} className="text-xl text-muted-foreground leading-relaxed">
                    Immersive internship programs in Cybersecurity, Full Stack Development, Data Science, and Data
                    Analysis. Transform your passion into expertise.
                  </AnimatedText>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 group"
                  >
                    <span className="group-hover:scale-105 transition-transform inline-block">Start Your Journey</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="group">
                    <span className="group-hover:scale-105 transition-transform inline-block">Explore Programs</span>
                  </Button>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-foreground">
                        {stat.number.includes("+") || stat.number.includes("%") || stat.number.includes("/") ? (
                          stat.number
                        ) : (
                          <CountingNumber end={Number.parseInt(stat.number)} />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Rocket className="w-16 h-16 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Launch Your Future</h3>
                    <p className="text-muted-foreground">Join the next generation of tech leaders</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      {/* Programs Preview */}
      <ProgressiveBlurSection blurIntensity="low" direction="up">
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <ScrollBlurReveal threshold={0.2}>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-foreground mb-4"
                >
                  Choose Your Path
                </motion.h2>
              </ScrollBlurReveal>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Discover our comprehensive internship programs designed to launch your tech career
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <InteractiveBlurCard sharpenOnHover={true}>
                    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 h-full hover:scale-105">
                      <CardContent className="p-6 space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                          className={`w-12 h-12 rounded-lg ${program.color} flex items-center justify-center`}
                        >
                          <program.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                            {program.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {program.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {program.level}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </InteractiveBlurCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link href="/programs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group"
                >
                  <span className="group-hover:scale-105 transition-transform inline-block">View All Programs</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </ProgressiveBlurSection>

      {/* Why Choose Us */}
      <ProgressiveBlurSection blurIntensity="medium" direction="both">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <ScrollBlurReveal threshold={0.2}>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-foreground mb-4"
                >
                  Why Choose Inlighn Tech?
                </motion.h2>
              </ScrollBlurReveal>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                We're not just another education platform. We're your launchpad to success.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ProgressiveBlurSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your Future?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful interns who launched their tech careers with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 group"
              >
                <span className="group-hover:scale-105 transition-transform inline-block">Apply Now</span>
                <Star className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="group">
                  <span className="group-hover:scale-105 transition-transform inline-block">Contact Us</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
