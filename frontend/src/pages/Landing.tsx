import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { 
  BookOpen, Brain, Clock, TreePine, BarChart3, 
  Map, Smile, ChevronRight, GraduationCap
} from 'lucide-react'


// Animation Variants
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const popIn: any = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } }
}

export function Landing() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F1FF] via-[#F4E8FF] to-[#EAE0FF] relative overflow-hidden font-sans">
      
      {/* Decorative Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-300/30 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#6C3BC7]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#F52B91]/10 blur-[150px]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto sticky top-0 z-50 backdrop-blur-xl bg-white/40 border-b border-white/40 shadow-sm"
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" className="w-10 h-10 drop-shadow-md" />
          <span className="font-bold text-2xl text-[#1E1B4B] tracking-tight">Study Buddy</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')} className="hidden sm:inline-flex font-semibold hover:bg-white/50">Login</Button>
          <Button variant="primary" onClick={() => navigate('/signup')} className="shadow-xl shadow-pink-200/50">Get Started</Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-12 md:pt-32 md:pb-24 max-w-7xl mx-auto text-center relative perspective-[1000px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-[#1E1B4B] mb-6 tracking-tight leading-[1.1] drop-shadow-sm"
          >
            Study Smart.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F52B91] to-[#6C3BC7]">
              Stay Focused.
            </span><br />
            Achieve More.
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-[#4a4273] text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Your all-in-one student productivity and learning companion. Access courses, track progress, block distractions, and grow your focus tree.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-2xl shadow-pink-300/50 hover:scale-105 transition-transform" onClick={() => navigate('/signup')}>
              Get Started for Free
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/60 backdrop-blur-md border-white/60 hover:bg-white hover:scale-105 transition-transform text-[#6C3BC7]" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Features
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Floating Hero Image (3D Render style) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ y: yPos }}
          className="mt-20 w-full max-w-4xl mx-auto relative perspective-[1000px]"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl border border-white"
          >
            <img src="/hero.png" alt="3D Student Desk" className="w-full h-auto max-h-[600px] object-cover rounded-3xl" />
          </motion.div>
          {/* Decorative floating badges */}
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-10 top-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
            <div className="bg-pink-100 p-2 rounded-full"><Brain className="text-[#F52B91] w-6 h-6" /></div>
            <div className="font-bold text-[#1E1B4B]">AI Assisted</div>
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-8 bottom-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
            <div className="bg-[#6C3BC7]/10 p-2 rounded-full"><TreePine className="text-[#6C3BC7] w-6 h-6" /></div>
            <div className="font-bold text-[#1E1B4B]">Focus Tree</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid - Scrollytelling */}
      <section id="features" className="px-6 py-32 relative z-10 bg-white/40 backdrop-blur-3xl border-y border-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 drop-shadow-sm">Everything you need</h2>
            <p className="text-xl text-[#4a4273] max-w-2xl mx-auto">Powerful features designed specifically to help students maintain focus and achieve their goals.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]"
          >
            {[
              { icon: Brain, title: 'AI Study Help', desc: 'Instant answers & summaries', color: 'text-purple-500', bg: 'bg-purple-100' },
              { icon: BookOpen, title: 'Smart Notes', desc: 'Organize by chapter', color: 'text-blue-500', bg: 'bg-blue-100' },
              { icon: Clock, title: 'Study Timer', desc: 'Pomodoro focus tracking', color: 'text-orange-500', bg: 'bg-orange-100' },
              { icon: TreePine, title: 'Focus Tree', desc: 'Gamify your study time', color: 'text-green-500', bg: 'bg-green-100' },
              { icon: BarChart3, title: 'Progress', desc: 'Detailed weekly analytics', color: 'text-[#F52B91]', bg: 'bg-pink-100' },
              { icon: Map, title: 'Study Material', desc: 'PDFs, Videos, MCQs', color: 'text-indigo-500', bg: 'bg-indigo-100' },
              { icon: Smile, title: 'Mood Tracking', desc: 'Stay emotionally healthy', color: 'text-yellow-500', bg: 'bg-yellow-100' },
              { icon: GraduationCap, title: 'Gate Pass', desc: 'Digital college requests', color: 'text-teal-500', bg: 'bg-teal-100' },
            ].map((f, i) => (
              <motion.div key={i} variants={popIn} whileHover={{ y: -10, rotateX: 5, rotateY: 5, scale: 1.02 }} style={{ transformStyle: 'preserve-3d' }}>
                <Card className="h-full border border-white bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#F52B91]/10 transition-all p-8 rounded-3xl">
                  <div className={`${f.bg} ${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white`} style={{ transform: 'translateZ(20px)' }}>
                    <f.icon size={32} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-[#1E1B4B]" style={{ transform: 'translateZ(15px)' }}>{f.title}</h3>
                  <p className="text-[#4a4273] text-base font-medium" style={{ transform: 'translateZ(10px)' }}>{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section with Parallax */}
      <section className="px-6 py-32 bg-gradient-to-br from-[#6C3BC7] to-[#4A2094] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-16 drop-shadow-md">Courses We Support</motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['School (11th, 12th)', 'Diploma (All Branches)', 'Engineering', 'Other Courses'].map((course, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-64 shadow-2xl"
              >
                <div className="h-20 w-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/10 rotate-3">
                  <BookOpen className="text-white drop-shadow-md" size={40} />
                </div>
                <h3 className="font-bold text-xl text-center leading-snug">{course}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works - Stepper */}
      <section className="px-6 py-32 relative">
         <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 drop-shadow-sm">How It Works</h2>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-6"
            >
              {[
                "Choose your course & semester",
                "Select subjects & study material",
                "Study smarter with AI & Timers",
                "Track progress & daily streaks",
                "Grow your focus tree"
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 p-6 rounded-3xl bg-white/60 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#F52B91]/10 transition-all border border-white"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F52B91] to-[#6C3BC7] text-white flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-inner">
                    {i + 1}
                  </div>
                  <span className="text-xl font-bold text-[#1E1B4B]">{step}</span>
                  {i === 4 && <TreePine className="ml-auto text-green-500 w-8 h-8 drop-shadow-sm" />}
                </motion.div>
              ))}
            </motion.div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F1FF] -z-10" />
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popIn}
          className="max-w-5xl mx-auto bg-gradient-to-br from-white to-white/40 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20"><Brain size={120} className="text-[#F52B91]" /></div>
          
          <h2 className="text-4xl md:text-6xl font-black text-[#1E1B4B] mb-8 leading-tight relative z-10 drop-shadow-sm">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl text-[#4a4273] font-medium mb-12 max-w-2xl mx-auto relative z-10">Join thousands of students who are already studying smarter, not harder.</p>
          <Button variant="primary" size="lg" className="w-full md:w-auto text-xl px-14 py-8 rounded-full shadow-2xl shadow-[#F52B91]/40 hover:scale-105 hover:shadow-[#F52B91]/60 transition-all relative z-10" onClick={() => navigate('/signup')}>
            Get Started For Free
            <ChevronRight className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-[#4a4273] font-medium border-t border-white/40 bg-white/20 backdrop-blur-md">
        <p>© 2026 Study Buddy. All rights reserved.</p>
      </footer>
    </div>
  )
}
