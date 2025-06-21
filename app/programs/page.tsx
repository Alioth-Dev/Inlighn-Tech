"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Code, Database, BarChart3, Brain, Smartphone, Search, Filter, Clock, Users, Award } from "lucide-react"
import { motion } from "framer-motion"
import { ProgramCardSkeleton } from "@/components/loading-skeletons"
import { LiquidButton, LiquidBackground, LiquidCard, LiquidLoader } from "@/components/liquid-animations"
import {
  ProgressiveBlurSection,
  InteractiveBlurCard,
  FocusBlurContainer,
  ScrollBlurReveal,
  LoadingBlurTransition,
  ProgressiveImage,
} from "@/components/progressive-blur"

const programs = [
  {
    id: 1,
    title: "Cybersecurity Specialist",
    category: "Security",
    duration: "12 weeks",
    level: "Intermediate",
    participants: 25,
    icon: Shield,
    description: "Master ethical hacking, penetration testing, and security analysis",
    skills: ["Ethical Hacking", "Network Security", "Malware Analysis", "Incident Response"],
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    category: "Development",
    duration: "16 weeks",
    level: "Beginner",
    participants: 30,
    icon: Code,
    description: "Build modern web applications from frontend to backend",
    skills: ["React", "Node.js", "MongoDB", "Express.js"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Data Science & Analytics",
    category: "Data",
    duration: "14 weeks",
    level: "Intermediate",
    participants: 20,
    icon: Database,
    description: "Extract insights from complex datasets using advanced analytics",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Business Intelligence",
    category: "Analytics",
    duration: "10 weeks",
    level: "Beginner",
    participants: 25,
    icon: BarChart3,
    description: "Transform data into actionable business intelligence",
    skills: ["Power BI", "Tableau", "Excel", "SQL"],
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "AI & Machine Learning",
    category: "AI",
    duration: "18 weeks",
    level: "Advanced",
    participants: 15,
    icon: Brain,
    description: "Build intelligent systems using cutting-edge AI technologies",
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "NLP"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "Development",
    duration: "12 weeks",
    level: "Intermediate",
    participants: 20,
    icon: Smartphone,
    description: "Create native and cross-platform mobile applications",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = ["All", "Security", "Development", "Data", "Analytics", "AI", "Infrastructure", "Design"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [focusedCard, setFocusedCard] = useState<number | null>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || program.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || program.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <LiquidBackground>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <ProgressiveBlurSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Our <span className="text-cyan-400">Programs</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Choose from our comprehensive range of internship programs designed to launch your tech career
              </p>
            </motion.div>
          </ProgressiveBlurSection>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <LoadingBlurTransition isLoading={isLoading}>
              <LiquidCard>
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search programs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10"
                        />
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground text-sm">Filter by:</span>
                        </div>

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-40 bg-muted border-border text-foreground">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                          <SelectTrigger className="w-40 bg-muted border-border text-foreground">
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {levels.map((level) => (
                              <SelectItem key={level} value={level} className="text-white hover:bg-slate-700">
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </LiquidCard>
            </LoadingBlurTransition>
          </motion.div>

          {/* Programs Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <ProgramCardSkeleton />
                </motion.div>
              ))}
            </div>
          ) : (
            <FocusBlurContainer
              focusedIndex={focusedCard}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              blurIntensity="medium"
            >
              {filteredPrograms.map((program, index) => (
                <ScrollBlurReveal key={program.id} threshold={0.2}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    onMouseEnter={() => setFocusedCard(index)}
                    onMouseLeave={() => setFocusedCard(null)}
                  >
                    <InteractiveBlurCard sharpenOnHover={true}>
                      <LiquidCard className="h-full">
                        <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 h-full">
                          <CardHeader className="pb-4">
                            <div className="mb-4">
                              <ProgressiveImage
                                src={program.image}
                                alt={program.title}
                                className="w-full h-32 rounded-lg"
                              />
                            </div>

                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                              >
                                <program.icon className="h-8 w-8 text-white" />
                              </div>
                              <Badge className={`${program.bgColor} text-white border-0`}>{program.category}</Badge>
                            </div>
                            <CardTitle className="text-xl font-bold text-foreground mb-2">{program.title}</CardTitle>
                            <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <div className="space-y-4">
                              {/* Program Details */}
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {program.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {program.participants} spots
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                  {program.level}
                                </Badge>
                                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                  <Award className="h-4 w-4" />
                                  Certificate
                                </div>
                              </div>

                              {/* Skills */}
                              <div>
                                <p className="text-muted-foreground text-sm mb-2">Key Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                  {program.skills.map((skill) => (
                                    <Badge key={skill} className="bg-slate-700 text-gray-300 text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-4">
                                <LiquidButton
                                  className={`flex-1 bg-gradient-to-r ${program.color} hover:opacity-90 text-white`}
                                  onClick={() => console.log(`Applied to ${program.title}`)}
                                >
                                  Apply Now
                                </LiquidButton>
                                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-slate-700">
                                  Learn More
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </LiquidCard>
                    </InteractiveBlurCard>
                  </motion.div>
                </ScrollBlurReveal>
              ))}
            </FocusBlurContainer>
          )}

          {/* No Results */}
          {!isLoading && filteredPrograms.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No programs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="text-center">
                <LiquidLoader size={80} />
                <p className="text-white mt-4 text-lg">Loading amazing programs...</p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <ProgressiveBlurSection blurIntensity="low" direction="up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-20 text-center"
            >
              <LiquidCard>
                <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
                  <CardContent className="p-12">
                    <h3 className="text-3xl font-bold text-foreground mb-4">Can't find the right program?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      We're constantly adding new programs based on industry demands. Contact us to discuss custom
                      training solutions for your specific needs.
                    </p>
                    <LiquidButton
                      variant="secondary"
                      className="px-8 py-3 text-lg"
                      onClick={() => console.log("Contact clicked")}
                    >
                      Contact Us
                    </LiquidButton>
                  </CardContent>
                </Card>
              </LiquidCard>
            </motion.div>
          </ProgressiveBlurSection>
        </div>
      </div>
    </LiquidBackground>
  )
}
