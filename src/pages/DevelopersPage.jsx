import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Heart, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import DeveloperCard from '../components/DeveloperCard'

const developers = [
  {
    name: 'Joaquin Adriano',
    initials: 'JA',
    role: 'Lead Frontend Developer',
    bio: 'Passionate about creating intuitive interfaces that promote student well-being. Advocates for SDG 3 through digital wellness tools.',
    skills: ['React', 'Framer Motion', 'Tailwind CSS', 'UI/UX Design'],
    accentColor: '#2383e2',
    avatarGradient: 'linear-gradient(135deg, #93c5fd, #1d4ed8)',
    links: { github: '#', linkedin: '#', website: '#' },
  },
  {
    name: 'Lance Benico',
    initials: 'LB',
    role: 'Full Stack Developer',
    bio: 'Building accessible education technology aligned with SDG 4. Believes every student deserves tools that adapt to their needs.',
    skills: ['Node.js', 'React', 'Zustand', 'API Design'],
    accentColor: '#37352f',
    avatarGradient: 'linear-gradient(135deg, #a8a29e, #292524)',
    links: { github: '#', linkedin: '#' },
  },
  {
    name: 'Kristine Cabanada',
    initials: 'KC',
    role: 'UX Researcher & Designer',
    bio: 'Researching the intersection of productivity and mental health. Designs experiences that reduce cognitive load and foster calm focus.',
    skills: ['User Research', 'Figma', 'Accessibility', 'Design Systems'],
    accentColor: '#b45309',
    avatarGradient: 'linear-gradient(135deg, #fcd34d, #b45309)',
    links: { github: '#', website: '#' },
  },
  {
    name: 'Warren Chua',
    initials: 'WC',
    role: 'Wellness Data Analyst',
    bio: 'Turning wellness metrics into actionable insights. Committed to data-driven approaches for improving student health outcomes.',
    skills: ['Data Visualization', 'Python', 'React', 'Statistics'],
    accentColor: '#0f766e',
    avatarGradient: 'linear-gradient(135deg, #99f6e4, #0f766e)',
    links: { github: '#', linkedin: '#', website: '#' },
  },
]

function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export default function DevelopersPage() {
  const containerRef = useRef(null)

  return (
    <PageTransition>
      <div ref={containerRef} className="min-h-screen pt-20 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-14 sm:mb-16"
          >
            <div className="w-12 h-12 rounded-md bg-text-primary flex items-center justify-center mx-auto mb-6">
              <Code2 className="w-6 h-6 text-white" aria-hidden />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-2">
              People
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-4">
              Meet the team
            </h1>
            <p className="text-[15px] text-text-secondary max-w-2xl mx-auto leading-relaxed">
              The people behind WellByte — focused on student life, well-being, and the spirit of{' '}
              <span className="text-emerald-700 font-medium">UN SDG 3</span> and{' '}
              <span className="text-rose-700 font-medium">SDG 4</span>.
            </p>
          </motion.div>

          <ParallaxSection offset={24}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
              {developers.map((dev, i) => (
                <DeveloperCard key={dev.name} developer={dev} index={i} />
              ))}
            </div>
          </ParallaxSection>

          <ParallaxSection offset={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="retro-window overflow-hidden"
            >
              <div className="retro-titlebar bg-[#fafafa]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">Mission</span>
              </div>
              <div className="p-8 sm:p-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 text-text-muted">
                  <Heart className="w-4 h-4" />
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3">
                  Built with purpose
                </h2>
                <p className="text-[15px] text-text-secondary max-w-xl mx-auto leading-relaxed">
                  WellByte is more than a productivity tool — it&apos;s a commitment to student well-being.
                  Every feature is designed with the UN Sustainable Development Goals in mind,
                  promoting both quality education and good health.
                </p>
                <div className="flex justify-center gap-2 mt-8 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Heart className="w-3.5 h-3.5" /> SDG 3 — Good health
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-sky-50 text-sky-900 border border-sky-200">
                    <Sparkles className="w-3.5 h-3.5" /> SDG 4 — Quality education
                  </span>
                </div>
              </div>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </PageTransition>
  )
}
