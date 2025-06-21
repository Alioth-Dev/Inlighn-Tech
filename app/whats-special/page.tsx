"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Play,
  Trophy,
  Code,
  Users,
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  Target,
  Zap,
  Crown,
  CheckCircle,
} from "lucide-react"

import { ReviewCardSkeleton } from "@/components/loading-skeletons"
import { ProgressiveBlurSection, InteractiveBlurCard, ScrollBlurReveal } from "@/components/progressive-blur"

// 3D Trophy Component
function Trophy3DPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg bg-muted/50">
      <Trophy className="w-16 h-16 text-muted-foreground" />
    </div>
  )
}

// Feedback data
const feedbacks = [
  {
    name: "Alex Johnson",
    role: "Full Stack Developer at Google",
    program: "Full Stack Development",
    rating: 5,
    comment:
      "The internship at Inlighn Tech completely transformed my career. The hands-on projects and expert mentorship gave me the confidence to land my dream job at Google.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sarah Chen",
    role: "Cybersecurity Analyst at Microsoft",
    program: "Cybersecurity",
    rating: 5,
    comment:
      "Outstanding program! The real-world scenarios and cutting-edge tools prepared me for the challenges in cybersecurity. Highly recommend to anyone serious about tech.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Rodriguez",
    role: "Data Scientist at Netflix",
    program: "Data Science",
    rating: 5,
    comment:
      "The data science program exceeded my expectations. Working on actual industry projects and learning from experienced mentors was invaluable for my career growth.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Davis",
    role: "Mobile Developer at Uber",
    program: "Mobile Development",
    rating: 5,
    comment:
      "From zero to hero in mobile development! The structured curriculum and supportive community helped me transition from a different field into tech successfully.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Video data
const videos = [
  {
    title: "Introduction to Cybersecurity",
    duration: "15:30",
    views: "12.5K",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Security",
  },
  {
    title: "React Fundamentals",
    duration: "22:45",
    views: "18.2K",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Development",
  },
  {
    title: "Data Analysis with Python",
    duration: "18:20",
    views: "15.8K",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
  },
  {
    title: "Machine Learning Basics",
    duration: "25:10",
    views: "20.1K",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "AI/ML",
  },
]

// Intern projects
const projects = [
  {
    title: "E-commerce Platform",
    intern: "John Smith",
    program: "Full Stack Development",
    description: "A complete e-commerce solution with React, Node.js, and MongoDB",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "Security Audit Tool",
    intern: "Lisa Wang",
    program: "Cybersecurity",
    description: "Automated security scanning and vulnerability assessment tool",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Python", "Nmap", "SQLMap", "Docker"],
    github: "#",
    live: "#",
  },
  {
    title: "Predictive Analytics Dashboard",
    intern: "David Brown",
    program: "Data Science",
    description: "Real-time analytics dashboard with machine learning predictions",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Python", "TensorFlow", "React", "D3.js"],
    github: "#",
    live: "#",
  },
]

// Benefits data
const benefits = [
  {
    icon: Award,
    title: "Industry-Recognized Certificate",
    description: "Get a certificate that's valued by top tech companies worldwide",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Personal guidance from industry experts throughout your journey",
  },
  {
    icon: Code,
    title: "Real Project Portfolio",
    description: "Build impressive projects that showcase your skills to employers",
  },
  {
    icon: Target,
    title: "Job Placement Support",
    description: "95% job placement rate with our extensive partner network",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Curriculum",
    description: "Learn the latest technologies and industry best practices",
  },
  {
    icon: Gift,
    title: "Lifetime Access",
    description: "Continued access to resources and community after completion",
  },
]

export default function WhatsSpecialPage() {
  const [currentFeedback, setCurrentFeedback] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStage, setLoadingStage] = useState(0)

  useEffect(() => {
    const stages = [
      { delay: 1000, stage: 1 }, // Hero loads
      { delay: 1800, stage: 2 }, // Feedback loads
      { delay: 2500, stage: 3 }, // Videos load
      { delay: 3200, stage: 4 }, // Projects load
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    setTimeout(() => setIsLoading(false), 3800)
  }, [])

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length)
  }

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-16">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
              <Crown className="w-4 h-4 mr-2" />
              What Makes Us Special
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Experience the
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Inlighn Difference
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover what sets our internship programs apart and why thousands of students choose us to launch their
              tech careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback from Interns */}
      <ProgressiveBlurSection blurIntensity="medium" direction="up">
        <section className="py-20 bg-muted/20">
          <ScrollBlurReveal threshold={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Feedback from Our Interns</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from our successful graduates who are now working at top tech companies
              </p>
            </motion.div>
          </ScrollBlurReveal>

          <div className="max-w-4xl mx-auto">
            {loadingStage < 2 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <ReviewCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                key={currentFeedback}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={feedbacks[currentFeedback].avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {feedbacks[currentFeedback].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {[...Array(feedbacks[currentFeedback].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-muted-foreground mb-4 italic">
                          "{feedbacks[currentFeedback].comment}"
                        </blockquote>
                        <div>
                          <div className="text-foreground font-semibold">{feedbacks[currentFeedback].name}</div>
                          <div className="text-blue-400 text-sm">{feedbacks[currentFeedback].role}</div>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {feedbacks[currentFeedback].program}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                onClick={prevFeedback}
                variant="outline"
                size="icon"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex space-x-2">
                {feedbacks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeedback(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFeedback ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextFeedback}
                variant="outline"
                size="icon"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </ProgressiveBlurSection>

      {/* Knowledge Through Videos */}
      <ProgressiveBlurSection blurIntensity="low" direction="both">
        <section className="py-20">
          <ScrollBlurReveal threshold={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Knowledge Through Videos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access our extensive library of educational videos and tutorials
              </p>
            </motion.div>
          </ScrollBlurReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <InteractiveBlurCard sharpenOnHover={true}>
                  <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {video.category}
                      </Badge>
                      <h3 className="text-foreground font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-muted-foreground text-sm">{video.views} views</p>
                    </CardContent>
                  </Card>
                </InteractiveBlurCard>
              </motion.div>
            ))}
          </div>
        </section>
      </ProgressiveBlurSection>

      {/* Epic Opportunity - Intern of the Month */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              EPIC OPPORTUNITY
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Intern of the Month Challenge</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compete with fellow interns and win amazing prizes, recognition, and career opportunities
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-[400px]">
                <Trophy3DPlaceholder />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Monthly Competition</h3>
                <p className="text-muted-foreground">
                  Every month, we recognize outstanding interns who demonstrate exceptional performance, innovation, and
                  dedication to their learning journey.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Prizes & Recognition</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Cash Prize", value: "$1,000" },
                    { title: "Certificate", value: "Special Recognition" },
                    { title: "LinkedIn Feature", value: "Company Spotlight" },
                    { title: "Job Referral", value: "Partner Companies" },
                  ].map((prize, index) => (
                    <Card key={index} className="bg-card border-border p-4 text-center">
                      <div className="text-lg font-bold text-foreground">{prize.value}</div>
                      <div className="text-sm text-muted-foreground">{prize.title}</div>
                    </Card>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Join the Challenge
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Interns' Project Showcase</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore amazing projects built by our talented interns during their programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/70 text-white text-xs">{project.program}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">by {project.intern}</p>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Workflow */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">How to Participate</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow our simple process to join our internship programs
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { step: 1, title: "Apply Online", description: "Submit your application with required documents" },
                { step: 2, title: "Assessment", description: "Complete technical and aptitude assessments" },
                { step: 3, title: "Interview", description: "Participate in technical interview process" },
                { step: 4, title: "Start Learning", description: "Begin your internship journey with us" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Rules & Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Must be 18+ years old</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Basic programming knowledge required</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Commit to full program duration</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Maintain 80% attendance rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Selection Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Application review (2-3 days)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Technical assessment (1 week)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Interview round (30 minutes)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">Final selection notification</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Perks & Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the amazing benefits of joining our internship programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certificate Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Industry-Recognized Certificate</h3>
                <p className="text-muted-foreground mb-6">
                  Upon successful completion of your internship program, you'll receive a professionally designed
                  certificate that's recognized by leading tech companies worldwide. This certificate validates your
                  skills and dedication to potential employers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-muted-foreground">Blockchain-secured authenticity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-muted-foreground">Recognized by 50+ partner companies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-muted-foreground">Digital and physical copies provided</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Sample Certificate"
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
