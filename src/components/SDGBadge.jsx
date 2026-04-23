import { motion } from 'framer-motion'
import { Heart, GraduationCap } from 'lucide-react'

const sdgs = [
  {
    number: 3,
    title: 'Good Health & Well-Being',
    description: 'Ensure healthy lives and promote well-being for all at all ages.',
    icon: Heart,
    bg: 'bg-emerald-100 border-emerald-300',
    iconColor: 'text-emerald-600',
  },
  {
    number: 4,
    title: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning.',
    icon: GraduationCap,
    bg: 'bg-red-100 border-red-300',
    iconColor: 'text-red-500',
  },
]

export default function SDGBadge() {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-base text-text-primary">sdg_goals</h3>
      <div className="space-y-3">
        {sdgs.map((sdg, i) => (
          <motion.div
            key={sdg.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-white border-2 border-win-border/40 hover:border-retro-pink/50 transition-all group"
          >
            <div className={`w-11 h-11 rounded-lg ${sdg.bg} border-2 flex items-center justify-center flex-shrink-0`}>
              <sdg.icon className={`w-5 h-5 ${sdg.iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                SDG {sdg.number}
                <span className="text-xs font-normal text-text-muted">•</span>
                <span className="text-xs font-semibold text-text-secondary">{sdg.title}</span>
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{sdg.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
