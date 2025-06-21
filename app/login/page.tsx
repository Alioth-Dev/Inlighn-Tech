"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Shield,
  BarChart3,
  MessageCircle,
  Users,
  CheckCircle,
  Star,
  Award,
} from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"
import Link from "next/link"
import { LoginFormSkeleton } from "@/components/loading-skeletons"

function FloatingElements() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <mesh position={[-2, 1, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[2, -1, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[0, 2, -1]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.8}>
        <mesh position={[-1, -2, 1]}>
          <tetrahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      </Float>
    </>
  )
}

function LoginScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <FloatingElements />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStage, setLoadingStage] = useState(0)

  // Simulate progressive loading
  useEffect(() => {
    const stages = [
      { delay: 1200, stage: 1 }, // Left side loads
      { delay: 2400, stage: 2 }, // Form loads
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("This is a demo login page. Backend integration would be implemented here.")
  }

  const portalFeatures = [
    {
      icon: BarChart3,
      title: "Personal Dashboard",
      description: "Track your learning progress and achievements",
      color: "bg-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Monitor your skill development and milestones",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Protected environment for your learning journey",
      color: "bg-purple-500",
    },
    {
      icon: MessageCircle,
      title: "Direct Messaging",
      description: "Connect with mentors and fellow interns",
      color: "bg-cyan-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Features */}
          {loadingStage < 1 ? (
            <div className="space-y-8">
              {/* Header skeleton */}
              <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-3/4" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-5/6" />
                </div>
              </div>

              {/* 3D scene skeleton */}
              <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-2xl animate-pulse" />

              {/* Features skeleton */}
              <div className="space-y-6">
                <div className="h-8 w-40 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-100 dark:bg-slate-800">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded-md mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md mb-1 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header Section */}
              <div className="space-y-6">
                {/* Secure Portal Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-4 py-2 text-sm font-medium">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure Portal Access
                  </Badge>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Welcome to <span className="text-blue-600 dark:text-cyan-400">Inlighn</span>
                    <br />
                    <span className="text-purple-600 dark:text-purple-400">Portal</span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-muted-foreground leading-relaxed max-w-lg"
                >
                  Access your personalized dashboard, track your progress, and connect with mentors and fellow interns.
                </motion.p>
              </div>

              {/* 3D Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-gray-200 dark:border-slate-700"
              >
                <Canvas>
                  <Suspense fallback={null}>
                    <LoginScene />
                  </Suspense>
                </Canvas>
              </motion.div>

              {/* Portal Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-foreground">Portal Features:</h3>

                <div className="grid grid-cols-1 gap-4">
                  {portalFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-card border-border hover:bg-muted/80 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-slate-700"
              >
                {[
                  { icon: Users, number: "5000+", label: "Active Users" },
                  { icon: Star, number: "4.9/5", label: "User Rating" },
                  { icon: Award, number: "95%", label: "Success Rate" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            {loadingStage < 2 ? (
              <LoginFormSkeleton />
            ) : (
              <Card className="bg-card border-border backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {isLogin ? "Sign In" : "Create Account"}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {isLogin
                      ? "Welcome back! Please sign in to your account."
                      : "Join Inlighn Tech and start your journey"}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}

                    {isLogin && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700"
                          />
                          <span>Remember me</span>
                        </label>
                        <Link
                          href="#"
                          className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      {isLogin ? "Sign In" : "Create Account"}
                    </Button>
                  </form>

                  <div className="relative">
                    <Separator className="bg-gray-300 dark:bg-slate-600" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white dark:bg-slate-800 px-2 text-gray-500 dark:text-gray-400 text-sm">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                        />
                      </svg>
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-semibold"
                      >
                        {isLogin ? "Sign up" : "Sign in"}
                      </button>
                    </p>
                  </div>

                  {/* Demo Notice */}
                  <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-800 dark:text-yellow-300 font-semibold text-sm mb-1">Demo Notice</h4>
                    <p className="text-yellow-700 dark:text-yellow-400 text-xs">
                      This is a demonstration login page. Backend integration is not implemented. The form will show an
                      alert when submitted.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm inline-flex items-center"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
