"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Target, Rocket, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoadmapStepSkeleton } from "@/components/loading-skeletons"

function Spaceship() {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <coneGeometry args={[0.3, 1.5, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </Float>
  )
}

function RoadmapScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Spaceship />

      {/* Roadmap points */}
      {[
        { position: [-3, 2, 0], color: "#10b981" },
        { position: [-1, 1, 0], color: "#3b82f6" },
        { position: [1, 0, 0], color: "#8b5cf6" },
        { position: [3, -1, 0], color: "#f59e0b" },
      ].map((point, index) => (
        <Float key={index} speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={point.position}>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color={point.color} />
          </mesh>
        </Float>
      ))}

      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStage, setLoadingStage] = useState(0)

  // Simulate progressive loading
  useEffect(() => {
    const stages = [
      { delay: 800, stage: 1 }, // Hero loads
      { delay: 1600, stage: 2 }, // Roadmap loads
      { delay: 2400, stage: 3 }, // Achievements load
      { delay: 3200, stage: 4 }, // Features load
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    setTimeout(() => setIsLoading(false), 4000)
  }, [])

  const achievements = [
    { icon: Users, number: "5000+", label: "Successful Interns", color: "text-blue-600 dark:text-blue-400" },
    { icon: Award, number: "50+", label: "Industry Partners", color: "text-green-600 dark:text-green-400" },
    { icon: Globe, number: "25+", label: "Countries Reached", color: "text-purple-600 dark:text-purple-400" },
    { icon: Star, number: "4.9/5", label: "Average Rating", color: "text-yellow-600 dark:text-yellow-400" },
  ]

  const roadmapSteps = [
    { title: "Application", description: "Submit your application with required documents", icon: "📝" },
    { title: "Assessment", description: "Complete our technical assessment", icon: "🧪" },
    { title: "Interview", description: "One-on-one interview with our experts", icon: "💬" },
    { title: "Onboarding", description: "Welcome to your internship journey", icon: "🚀" },
  ]

  const whyChooseUs = [
    {
      title: "Industry-Relevant Curriculum",
      description: "Our programs are designed with input from leading tech companies",
      icon: Target,
    },
    {
      title: "Personalized Mentorship",
      description: "Each intern gets paired with an experienced industry mentor",
      icon: Users,
    },
    {
      title: "Real-World Projects",
      description: "Work on actual projects that solve real business problems",
      icon: Rocket,
    },
    {
      title: "Career Support",
      description: "Comprehensive career guidance and job placement assistance",
      icon: Award,
    },
  ]

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {loadingStage < 1 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-3/4" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-5/6" />
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-4/5" />
                </div>
                <div className="flex flex-wrap gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  About <span className="text-blue-600 dark:text-cyan-400">Inlighn Tech</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  We're revolutionizing tech education by providing immersive, hands-on internship experiences that
                  bridge the gap between academic learning and industry requirements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-4 py-2 text-sm">
                    Founded 2020
                  </Badge>
                  <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-4 py-2 text-sm">
                    5000+ Graduates
                  </Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 px-4 py-2 text-sm">
                    Global Reach
                  </Badge>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-96"
            >
              <Canvas>
                <Suspense fallback={null}>
                  <RoadmapScene />
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internship Journey Roadmap */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your <span className="text-blue-600 dark:text-cyan-400">Journey</span> With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our structured roadmap to transform from a student to a skilled professional
            </p>
          </motion.div>

          <div className="relative">
            {/* Roadmap Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {roadmapSteps.map((step, index) => (
                <div key={step.title}>
                  {loadingStage < 2 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <RoadmapStepSkeleton />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="relative"
                    >
                      <Card className="bg-card border-border hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-4">{step.icon}</div>
                          <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>

                      {/* Step number */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-blue-600 dark:text-cyan-400">Achievements</span>
            </h2>
            <p className="text-xl text-muted-foreground">Numbers that speak for our success</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label}>
                {loadingStage < 3 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-4 animate-pulse" />
                    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-md mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className={`w-20 h-20 bg-white dark:bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-200 dark:border-slate-700 backdrop-blur-sm`}
                    >
                      <achievement.icon className={`h-10 w-10 ${achievement.color}`} />
                    </div>
                    <div className={`text-4xl md:text-5xl font-bold ${achievement.color} mb-2`}>
                      {achievement.number}
                    </div>
                    <div className="text-muted-foreground text-lg">{achievement.label}</div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="text-blue-600 dark:text-cyan-400">Us?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another education platform. Here's what makes us different.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={item.title}>
                {loadingStage < 4 ? (
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 h-full backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg flex-shrink-0 animate-pulse" />
                          <div className="flex-1 space-y-3">
                            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-5/6" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Card className="bg-card border-border hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300 h-full backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-card border-border h-full backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                    <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To bridge the gap between academic learning and industry requirements by providing immersive,
                    hands-on internship experiences that prepare students for successful careers in technology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-card border-border h-full backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                    <Rocket className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To become the global leader in tech education, empowering the next generation of innovators and
                    problem-solvers who will shape the future of technology and drive positive change in the world.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
