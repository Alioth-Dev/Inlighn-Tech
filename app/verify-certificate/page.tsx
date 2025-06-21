"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Shield, CheckCircle, XCircle, Award, Calendar, User, Hash } from "lucide-react"
import { motion } from "framer-motion"

// Mock certificate data
const mockCertificates = {
  CERT001: {
    id: "CERT001",
    internId: "INT2024001",
    internName: "John Doe",
    program: "Full Stack Web Development",
    issueDate: "2024-03-15",
    completionDate: "2024-03-10",
    grade: "A+",
    skills: ["React", "Node.js", "MongoDB", "Express.js"],
    mentor: "Sarah Johnson",
    status: "Valid",
  },
  CERT002: {
    id: "CERT002",
    internId: "INT2024002",
    internName: "Jane Smith",
    program: "Cybersecurity Specialist",
    issueDate: "2024-02-28",
    completionDate: "2024-02-25",
    grade: "A",
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing"],
    mentor: "Mike Wilson",
    status: "Valid",
  },
  INT2024001: {
    id: "CERT001",
    internId: "INT2024001",
    internName: "John Doe",
    program: "Full Stack Web Development",
    issueDate: "2024-03-15",
    completionDate: "2024-03-10",
    grade: "A+",
    skills: ["React", "Node.js", "MongoDB", "Express.js"],
    mentor: "Sarah Johnson",
    status: "Valid",
  },
}

export default function VerifyCertificatePage() {
  const [searchId, setSearchId] = useState("")
  const [certificate, setCertificate] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    setSearchAttempted(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const found = mockCertificates[searchId as keyof typeof mockCertificates]
    setCertificate(found || null)
    setIsSearching(false)
  }

  const handleReset = () => {
    setSearchId("")
    setCertificate(null)
    setSearchAttempted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Verify <span className="text-cyan-400">Certificate</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Verify the authenticity of Inlighn Tech certificates using Certificate ID or Intern ID
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Search className="h-5 w-5 text-cyan-400" />
                Certificate Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="searchId" className="text-muted-foreground">
                  Enter Certificate ID or Intern ID
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="searchId"
                    placeholder="e.g., CERT001 or INT2024001"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder-muted-foreground flex-1"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!searchId.trim() || isSearching}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  💡 <strong>Sample IDs to try:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 cursor-pointer hover:bg-blue-500/10"
                    onClick={() => setSearchId("CERT001")}
                  >
                    CERT001
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-400 cursor-pointer hover:bg-green-500/10"
                    onClick={() => setSearchId("CERT002")}
                  >
                    CERT002
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 cursor-pointer hover:bg-purple-500/10"
                    onClick={() => setSearchId("INT2024001")}
                  >
                    INT2024001
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        {searchAttempted && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {certificate ? (
              // Valid Certificate
              <Card className="bg-card border-green-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      Certificate Verified
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{certificate.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Certificate Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Certificate ID</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Hash className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground font-mono">{certificate.id}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Intern ID</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Hash className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground font-mono">{certificate.internId}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Intern Name</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground">{certificate.internName}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Program</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground">{certificate.program}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Issue Date</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground">{certificate.issueDate}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Completion Date</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground">{certificate.completionDate}</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Grade</Label>
                        <div className="mt-1">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            {certificate.grade}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground text-sm">Mentor</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="h-4 w-4 text-cyan-400" />
                          <span className="text-foreground">{certificate.mentor}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Skills */}
                  <div>
                    <Label className="text-muted-foreground text-sm mb-3 block">Skills Acquired</Label>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill: string) => (
                        <Badge key={skill} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-slate-700"
                    >
                      Verify Another
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      Download Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Invalid Certificate
              <Card className="bg-card border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-400" />
                    Certificate Not Found
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Invalid Certificate ID</h3>
                    <p className="text-muted-foreground mb-6">
                      The certificate ID "{searchId}" could not be found in our database.
                    </p>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                      <h4 className="text-red-400 font-semibold mb-2">Possible reasons:</h4>
                      <ul className="text-red-300 text-sm space-y-1 text-left">
                        <li>• Certificate ID is incorrect or misspelled</li>
                        <li>• Certificate has been revoked or expired</li>
                        <li>• Certificate is from a different institution</li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleReset}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Info Section */}
        {!searchAttempted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-muted/50 border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  How Certificate Verification Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">1. Enter ID</h4>
                    <p className="text-muted-foreground text-sm">
                      Enter the Certificate ID or Intern ID you want to verify
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">2. Verification</h4>
                    <p className="text-muted-foreground text-sm">
                      Our system checks the certificate against our secure database
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">3. Results</h4>
                    <p className="text-muted-foreground text-sm">
                      Get instant verification results with detailed certificate information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
