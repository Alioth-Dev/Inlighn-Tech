"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { FormSkeleton, ContactInfoSkeleton } from "@/components/loading-skeletons"
import { LiquidButton, LiquidCard, LiquidInput, LiquidBackground, LiquidLoader } from "@/components/liquid-animations"

function RingingPhone() {
  const phoneRef = useRef<any>()

  useFrame((state) => {
    if (phoneRef.current) {
      // Ringing animation - shake effect
      phoneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 8) * 0.1
      phoneRef.current.position.x = Math.sin(state.clock.elapsedTime * 12) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={phoneRef}>
        {/* Phone body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.15]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        {/* Phone screen */}
        <mesh position={[0, 0.1, 0.08]}>
          <boxGeometry args={[0.6, 0.9, 0.02]} />
          <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.3} />
        </mesh>

        {/* Phone speaker */}
        <mesh position={[0, 0.45, 0.08]}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* Phone home button */}
        <mesh position={[0, -0.45, 0.08]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* Ringing waves */}
        {[1, 2, 3].map((i) => (
          <mesh key={i} position={[0.6 + i * 0.3, 0.3, 0]} scale={[1, 1, 0.1]}>
            <torusGeometry args={[0.1 + i * 0.1, 0.02]} />
            <meshStandardMaterial
              color="#06b6d4"
              transparent
              opacity={0.6 - i * 0.15}
              emissive="#0891b2"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-5, 5, 5]} color="#06b6d4" intensity={0.5} />
      <RingingPhone />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    program: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStage, setLoadingStage] = useState(0)

  // Simulate progressive loading
  useEffect(() => {
    const stages = [
      { delay: 1000, stage: 1 }, // Header loads
      { delay: 2000, stage: 2 }, // Form loads
      { delay: 3000, stage: 3 }, // Contact info loads
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    setTimeout(() => setIsLoading(false), 3500)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@inlighntech.com",
      description: "Send us an email anytime",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Street, Silicon Valley, CA",
      description: "Our main office location",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      details: "25+ Countries",
      description: "Serving students worldwide",
      color: "from-orange-500 to-red-500",
    },
  ]

  if (submitted) {
    return (
      <LiquidBackground variant="ocean" intensity="low">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <LiquidCard variant="glow" className="max-w-md mx-auto">
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <LiquidButton
                    variant="primary"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        program: "",
                        message: "",
                      })
                    }}
                  >
                    Send Another Message
                  </LiquidButton>
                </CardContent>
              </Card>
            </LiquidCard>
          </motion.div>
        </div>
      </LiquidBackground>
    )
  }

  return (
    <LiquidBackground variant="ocean" intensity="medium">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          {loadingStage < 1 ? (
            <div className="text-center mb-16">
              <div className="h-16 bg-gray-200 dark:bg-slate-700 rounded-md mx-auto mb-6 max-w-md animate-pulse" />
              <div className="space-y-2 max-w-3xl mx-auto">
                <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-5/6 mx-auto" />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Contact <span className="text-blue-600 dark:text-cyan-400">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to start your tech journey? Get in touch with us and let's discuss how we can help you achieve
                your goals.
              </p>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            {loadingStage < 2 ? (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <FormSkeleton />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <LiquidCard variant="wave">
                  <Card className="bg-card border-border backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-foreground text-2xl flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
                        Send us a Message
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground">
                              Full Name *
                            </Label>
                            <LiquidInput
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(value) => handleInputChange("name", value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">
                              Email Address *
                            </Label>
                            <LiquidInput
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(value) => handleInputChange("email", value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-foreground">
                              Phone Number
                            </Label>
                            <LiquidInput
                              placeholder="+1 (555) 123-4567"
                              value={formData.phone}
                              onChange={(value) => handleInputChange("phone", value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="program" className="text-foreground">
                              Interested Program
                            </Label>
                            <Select
                              value={formData.program}
                              onValueChange={(value) => handleInputChange("program", value)}
                            >
                              <SelectTrigger className="bg-muted border-border text-foreground placeholder-muted-foreground">
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="cybersecurity" className="text-foreground hover:bg-muted">
                                  Cybersecurity
                                </SelectItem>
                                <SelectItem value="fullstack" className="text-foreground hover:bg-muted">
                                  Full Stack Development
                                </SelectItem>
                                <SelectItem value="datascience" className="text-foreground hover:bg-muted">
                                  Data Science
                                </SelectItem>
                                <SelectItem value="dataanalysis" className="text-foreground hover:bg-muted">
                                  Data Analysis
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-foreground">
                            Subject *
                          </Label>
                          <LiquidInput
                            placeholder="What's this about?"
                            value={formData.subject}
                            onChange={(value) => handleInputChange("subject", value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-foreground">
                            Message *
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us more about your inquiry..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className="bg-muted border-border text-foreground placeholder-muted-foreground min-h-32"
                            required
                          />
                        </div>

                        <LiquidButton variant="primary" size="lg" className="w-full" onClick={handleSubmit}>
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <LiquidLoader size={20} variant="pulse" />
                              Sending Message...
                            </div>
                          ) : (
                            <>
                              Send Message <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </LiquidButton>
                      </form>
                    </CardContent>
                  </Card>
                </LiquidCard>
              </motion.div>
            )}

            {/* Contact Info & 3D Scene */}
            <div className="space-y-8">
              {/* Enhanced 3D Phone Animation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="h-80 rounded-lg overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg"></div>
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <Suspense fallback={null}>
                    <ContactScene />
                  </Suspense>
                </Canvas>

                {/* Call to action overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <LiquidCard variant="glow">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">We're available to help!</span>
                      </div>
                      <p className="text-white/80 text-xs mt-1">Call us or send a message</p>
                    </div>
                  </LiquidCard>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid gap-4 relative"
              >
                {/* Floating call indicators */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-cyan-400/60"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
                {contactInfo.map((info, index) => (
                  <div key={info.title}>
                    {loadingStage < 3 ? (
                      <ContactInfoSkeleton />
                    ) : (
                      <LiquidCard variant="morph">
                        <Card className="bg-card border-border hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                <info.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-foreground font-bold mb-1">{info.title}</h3>
                                <p className="text-blue-600 dark:text-cyan-400 font-semibold mb-1">{info.details}</p>
                                <p className="text-muted-foreground text-sm">{info.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </LiquidCard>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <LiquidCard variant="wave">
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/20 dark:to-purple-500/20 border-blue-200 dark:border-blue-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-foreground font-bold text-lg">Office Hours</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="text-foreground">9:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="text-foreground">10:00 AM - 4:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="text-foreground">Closed</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          💡 For urgent inquiries outside office hours, please email us and we'll respond within 24
                          hours.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </LiquidCard>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <LiquidCard variant="glow">
              <Card className="bg-white/50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">How long does it take to get a response?</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        We typically respond to all inquiries within 24 hours during business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">Can I schedule a call?</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Yes! Mention your preferred time in the message and we'll arrange a call.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">Do you offer program consultations?</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        We provide free consultations to help you choose the right program.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold mb-2">What information should I include?</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Include your background, interests, and specific questions about our programs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LiquidCard>
          </motion.div>
        </div>
      </div>
    </LiquidBackground>
  )
}
