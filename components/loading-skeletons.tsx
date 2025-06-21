"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Base skeleton effects
export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-slate-700 rounded-md ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export function WaveSkeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-slate-700 rounded-md ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/40 to-blue-400/20"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export function PulseSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gray-200 dark:bg-slate-700 rounded-md ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Navbar skeleton
export function NavbarSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <ShimmerSkeleton className="w-8 h-8 rounded-lg" />
            <WaveSkeleton className="h-6 w-32" />
          </div>

          {/* Desktop navigation skeleton */}
          <div className="hidden lg:flex items-center space-x-8">
            {[...Array(6)].map((_, i) => (
              <PulseSkeleton key={i} className="h-4 w-20" />
            ))}
          </div>

          {/* Right side skeleton */}
          <div className="hidden lg:flex items-center space-x-4">
            <ShimmerSkeleton className="w-8 h-8 rounded-md" />
            <WaveSkeleton className="h-10 w-32 rounded-md" />
          </div>

          {/* Mobile menu skeleton */}
          <div className="flex items-center space-x-2 lg:hidden">
            <PulseSkeleton className="w-8 h-8 rounded-md" />
            <ShimmerSkeleton className="w-8 h-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Main title skeleton */}
          <div className="space-y-4">
            <ShimmerSkeleton className="h-16 md:h-20 w-full max-w-4xl mx-auto" />
            <WaveSkeleton className="h-16 md:h-20 w-3/4 max-w-3xl mx-auto" />
          </div>

          {/* Subtitle skeleton */}
          <div className="space-y-2 mt-8">
            <PulseSkeleton className="h-6 w-full max-w-3xl mx-auto" />
            <ShimmerSkeleton className="h-6 w-5/6 max-w-2xl mx-auto" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <WaveSkeleton className="h-12 w-48" />
            <PulseSkeleton className="h-12 w-40" />
          </div>
        </div>
      </div>

      {/* Floating particles skeleton */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Stats section skeleton
export function StatsSkeleton() {
  return (
    <div className="py-20 px-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <ShimmerSkeleton className="h-12 w-32 mx-auto mb-2" />
              <WaveSkeleton className="h-6 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Program card skeleton
export function ProgramCardSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 h-full">
      <CardHeader className="pb-4">
        {/* Program image skeleton */}
        <ShimmerSkeleton className="w-full h-32 rounded-lg mb-4" />

        <div className="flex items-start justify-between mb-4">
          <WaveSkeleton className="w-16 h-16 rounded-xl" />
          <PulseSkeleton className="w-20 h-6 rounded-full" />
        </div>
        <ShimmerSkeleton className="h-6 w-3/4 mb-2" />
        <div className="space-y-2">
          <WaveSkeleton className="h-4 w-full" />
          <PulseSkeleton className="h-4 w-2/3" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <ShimmerSkeleton className="h-4 w-20" />
            <WaveSkeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <PulseSkeleton className="h-6 w-16 rounded-full" />
            <ShimmerSkeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2">
            <WaveSkeleton className="h-4 w-16" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <PulseSkeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <ShimmerSkeleton className="h-10 flex-1 rounded-md" />
            <WaveSkeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Certificate verification skeleton
export function CertificateVerificationSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PulseSkeleton className="h-6 w-6 rounded-full" />
            <ShimmerSkeleton className="h-6 w-40" />
          </div>
          <WaveSkeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <PulseSkeleton className="h-4 w-24 mb-2" />
                <div className="flex items-center gap-2">
                  <ShimmerSkeleton className="h-4 w-4" />
                  <WaveSkeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <PulseSkeleton className="h-4 w-20 mb-2" />
                <div className="flex items-center gap-2">
                  <ShimmerSkeleton className="h-4 w-4" />
                  <WaveSkeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
          <PulseSkeleton className="h-4 w-32 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <ShimmerSkeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <WaveSkeleton className="h-10 w-32 rounded-md" />
          <PulseSkeleton className="h-10 w-40 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

// Review card skeleton
export function ReviewCardSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <PulseSkeleton className="h-10 w-10 rounded-full" />
          <div>
            <ShimmerSkeleton className="h-4 w-24 mb-1" />
            <WaveSkeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex mb-3 gap-1">
          {[...Array(5)].map((_, i) => (
            <PulseSkeleton key={i} className="h-4 w-4 rounded-sm" />
          ))}
        </div>
        <div className="space-y-2">
          <ShimmerSkeleton className="h-4 w-full" />
          <WaveSkeleton className="h-4 w-5/6" />
          <PulseSkeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

// Video card skeleton
export function VideoCardSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <ShimmerSkeleton className="w-20 h-12 rounded flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <WaveSkeleton className="h-4 w-full mb-1" />
            <PulseSkeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Project showcase skeleton
export function ProjectCardSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 h-full">
      <CardContent className="p-0">
        <ShimmerSkeleton className="w-full aspect-video" />
        <div className="p-6">
          <WaveSkeleton className="h-6 w-3/4 mb-2" />
          <PulseSkeleton className="h-4 w-1/2 mb-3" />
          <div className="space-y-2 mb-4">
            <ShimmerSkeleton className="h-4 w-full" />
            <WaveSkeleton className="h-4 w-2/3" />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <PulseSkeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
          <ShimmerSkeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

// Contact info skeleton
export function ContactInfoSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <WaveSkeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
          <div className="flex-1">
            <ShimmerSkeleton className="h-5 w-24 mb-1" />
            <PulseSkeleton className="h-4 w-32 mb-1" />
            <WaveSkeleton className="h-3 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Form skeleton
export function FormSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PulseSkeleton className="h-6 w-6" />
          <ShimmerSkeleton className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <WaveSkeleton className="h-4 w-20" />
              <ShimmerSkeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <PulseSkeleton className="h-4 w-24" />
              <WaveSkeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <ShimmerSkeleton className="h-4 w-28" />
              <PulseSkeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <WaveSkeleton className="h-4 w-32" />
              <ShimmerSkeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <PulseSkeleton className="h-4 w-16" />
            <WaveSkeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <ShimmerSkeleton className="h-4 w-20" />
            <PulseSkeleton className="h-32 w-full" />
          </div>
          <WaveSkeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

// Footer skeleton
export function FooterSkeleton() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company info skeleton */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ShimmerSkeleton className="w-8 h-8 rounded-lg" />
              <WaveSkeleton className="h-6 w-32" />
            </div>
            <div className="space-y-2 mb-6">
              <PulseSkeleton className="h-4 w-full" />
              <ShimmerSkeleton className="h-4 w-5/6" />
              <WaveSkeleton className="h-4 w-4/5" />
            </div>
            <div className="flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <PulseSkeleton key={i} className="w-8 h-8 rounded-md" />
              ))}
            </div>
          </div>

          {/* Links sections skeleton */}
          {[...Array(3)].map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <ShimmerSkeleton className="h-5 w-24 mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <WaveSkeleton key={i} className="h-4 w-20" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <PulseSkeleton className="h-4 w-64" />
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[...Array(3)].map((_, i) => (
                <ShimmerSkeleton key={i} className="h-4 w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Achievement/Feature card skeleton
export function FeatureCardSkeleton() {
  return (
    <div className="text-center">
      <WaveSkeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
      <ShimmerSkeleton className="h-6 w-32 mx-auto mb-4" />
      <div className="space-y-2">
        <PulseSkeleton className="h-4 w-full" />
        <WaveSkeleton className="h-4 w-5/6 mx-auto" />
      </div>
    </div>
  )
}

// Roadmap step skeleton
export function RoadmapStepSkeleton() {
  return (
    <div className="relative">
      <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
        <CardContent className="p-6 text-center">
          <ShimmerSkeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
          <WaveSkeleton className="h-5 w-24 mx-auto mb-3" />
          <PulseSkeleton className="h-4 w-32 mx-auto" />
        </CardContent>
      </Card>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <PulseSkeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  )
}

// Search/Filter skeleton
export function SearchFilterSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <ShimmerSkeleton className="h-10 flex-1 max-w-md" />
          <div className="flex gap-4 items-center">
            <PulseSkeleton className="h-4 w-16" />
            <WaveSkeleton className="h-10 w-40" />
            <ShimmerSkeleton className="h-10 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Login form skeleton
export function LoginFormSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center pb-6">
        <WaveSkeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <ShimmerSkeleton className="h-8 w-32 mx-auto mb-2" />
        <PulseSkeleton className="h-4 w-48 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <WaveSkeleton className="h-4 w-24" />
            <ShimmerSkeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <PulseSkeleton className="h-4 w-20" />
            <WaveSkeleton className="h-10 w-full" />
          </div>
          <div className="flex items-center justify-between">
            <ShimmerSkeleton className="h-4 w-24" />
            <PulseSkeleton className="h-4 w-28" />
          </div>
          <WaveSkeleton className="h-12 w-full" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <ShimmerSkeleton className="h-px w-full" />
          </div>
          <div className="relative flex justify-center">
            <PulseSkeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <WaveSkeleton className="h-10 w-full" />
          <ShimmerSkeleton className="h-10 w-full" />
        </div>
        <PulseSkeleton className="h-4 w-48 mx-auto" />
      </CardContent>
    </Card>
  )
}
