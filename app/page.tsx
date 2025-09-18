"use client"

import type React from "react"
import Image from "next/image"
import imagePersonal from "../public/Adham1.jpg"
import { myProjects } from "@/public/myProjext"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "next-themes"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import Link from "next/link"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiBootstrap,
  SiSass,
  SiJquery,
  SiMui,
  SiGithub,
  SiPython,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const skillIcons: Record<string, React.ReactNode> = {
  HTML5: <SiHtml5 className="inline-block mr-1 text-orange-500" />,
  CSS3: <SiCss3 className="inline-block mr-1 text-blue-500" />,
  JavaScript: <SiJavascript className="inline-block mr-1 text-yellow-400" />,
  TypeScript: <SiTypescript className="inline-block mr-1 text-blue-600" />,
  React: <SiReact className="inline-block mr-1 text-cyan-400" />,
  Nextjs: <SiNextdotjs className="inline-block mr-1 text-gray-900 dark:text-white" />, // ✅ Next.js
  Tailwind: <SiTailwindcss className="inline-block mr-1 text-sky-400" />,              // ✅ Tailwind
  Bootstrap: <SiBootstrap className="inline-block mr-1 text-purple-600" />,
  Sass: <SiSass className="inline-block mr-1 text-pink-500" />,
  jQuery: <SiJquery className="inline-block mr-1 text-blue-400" />,
  "Material UI": <SiMui className="inline-block mr-1 text-sky-500" />,
  "Git & Github": <SiGithub className="inline-block mr-1 text-gray-700 dark:text-white" />,
  Python: <SiPython className="inline-block mr-1 text-yellow-500" />,
  Figma: <SiFigma className="inline-block mr-1 text-pink-400" />,
}


const SkillCard = ({ icon: Icon, title, skills }: { icon: any; title: string; skills: string[] }) => {
  return (
       <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full bg-gradient-to-br from-background to-muted/50 border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="text-center">
          <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  {skillIcons[skill] ?? null}
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ProjectCard = ({ title, imgPath, demo, github }: 
  { title: string; imgPath: string; demo: string; github: string }) => {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full bg-gradient-to-br from-background to-muted/30 hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <div className="flex gap-2">
              <Link href={demo} target="_blank">
                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href={github} target="_blank">
                <Github className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-48 relative mb-4">
            <Image
              src={imgPath}
              alt={title}
              fill
              className="object-cover rounded-lg border"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading..")

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500) // Small delay before hiding
          return 100
        }
        return prev + 2
      })
    }, 50)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading"
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="text-center z-10">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-2xl"
          >
           <Image
        src={imagePersonal} // حط الصورة في مجلد public
        alt="Profile"
        width={96}
        height={96}
         className="object-cover w-full h-full rounded-full border-4 border-white"
      />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl font-semibold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          {loadingText}
        </motion.h2>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-64 mx-auto"
        >
          <div className="bg-muted rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-sm text-muted-foreground"
          >
            {progress}%
          </motion.p>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

const technicalSkills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Nextjs",      // 👈 لازم نفس الاسم زي اللي في skillIcons
  "Tailwind",    // 👈 لازم نفس الاسم زي اللي في skillIcons
  "Bootstrap",
  "Sass",
  "jQuery",
  "Material UI",
  "Git & Github",
  "Python",
  "Figma",
]


  const softSkills = ["Time Management", "Self-learner", "Self-motivated", "Team player"]

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
          >
            {/* All existing portfolio content remains the same */}
            <ThemeToggle />

            {/* Animated Background */}
            <motion.div className="fixed inset-0 opacity-30 pointer-events-none" style={{ y: backgroundY }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            </motion.div>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative px-4">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mb-8"
                >
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground mb-6">
                   <Image
        src={imagePersonal} // حط الصورة في مجلد public
        alt="Profile"
        width={96}
        height={96}
         className="object-cover w-full h-full rounded-full border-4 border-white"
      />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Adham Magdy Elsayed
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-8"
                >
                  React Front-End Developer
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap justify-center gap-4 mb-8"
                >

                  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=magdyadham229@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Mail className="h-4 w-4" />
                    magdyadham229@gmail.com
                  </Button></a>
               <a
  href="https://wa.me/201012955916"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="outline"
    size="sm"
    className="flex items-center gap-2 bg-transparent"
  >
    <Phone className="h-4 w-4" />
    01012955916
  </Button>
</a>

                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <MapPin className="h-4 w-4" />
                    Mansoura, Egypt
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex justify-center gap-4"
                >
                 <Link href="https://github.com/Adham901" target="_blank" rel="noopener noreferrer">
      <Button size="lg" className="flex items-center gap-2">
        <Github className="h-5 w-5" />
          Adham901
      </Button>
    </Link>

        <Link href="https://www.linkedin.com/in/adham-magdy-311abb23b/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Linkedin className="h-5 w-5" />
                    Adham-magdy
                  </Button>

                   </Link>
            <a
  href="/Adham-Magdy-Elsayed.pdf"
  download
>
  <Button size="lg" variant="secondary" className="flex items-center gap-2">
    <Download className="h-5 w-5" />
    Resume
  </Button>
</a>

                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <AnimatedSection className="py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">About Me</h2>
                <Card className="bg-gradient-to-br from-background to-muted/30">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      I'm an experienced Front-End Developer with a strong understanding of modern web technologies. I
                      specialize in creating immersive and intuitive user experiences. It is my pleasure to visit my
                      portfolio and explore the projects that showcase my passion for frontend development.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>

            {/* Skills Section */}
           <AnimatedSection className="py-20 px-4 bg-muted/30">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">Skills & Expertise</h2>
                <div className="grid  gap-8 ">
                  <SkillCard icon={Code} title="Technical Skills" skills={technicalSkills} />
              
                </div>
              </div>
            </AnimatedSection>

            {/* Projects Section */}
         {/* Projects Section */}
<AnimatedSection className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {myProjects.map((project, idx) => (
        <ProjectCard
          key={idx}
          title={project.projectTitle}
          imgPath={project.imgPath}
          demo={project.demo}
          github={project.github}
        />
      ))}
    </div>
  </div>
</AnimatedSection>


            {/* Education & Experience */}
            <AnimatedSection className="py-20 px-4 bg-muted/30">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">Education & Experience</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-background to-muted/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Bachelor of Engineering</h3>
                          <p className="text-sm text-muted-foreground">Electronics and Communication Engineering</p>
                          <p className="text-sm text-muted-foreground">Mansoura University</p>
                          <Badge variant="outline" className="mt-2">
                            2019 – 2024
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-background to-muted/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Frontend Development Intern</h3>
                          <p className="text-sm text-muted-foreground">National Telecommunication Institute (NTI)</p>
                          <Badge variant="outline" className="mt-2">
                            03/2022 – 08/2022
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>

            {/* Languages Section */}
            <AnimatedSection className="py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-16">Languages</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-background to-muted/30">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold mb-2">Arabic</h3>
                      <Badge variant="default">Native</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-background to-muted/30">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-semibold mb-2">English</h3>
                      <Badge variant="secondary">Intermediate</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Section */}
            <AnimatedSection className="py-20 px-4 bg-muted/30">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to bring your ideas to life? Let's work together!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
             <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=magdyadham229@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button size="lg" className="flex items-center gap-2">
    <Mail className="h-5 w-5" />
    Email Me
  </Button>
</a>

             
                </div>
              </div>
            </AnimatedSection>

            {/* Footer */}
            <footer className="py-8 px-4 border-t">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-muted-foreground">© 2024 Adham Magdy Elsayed💕🧑‍💻.</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
