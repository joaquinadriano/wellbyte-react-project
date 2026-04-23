import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Globe, ExternalLink, Link2 } from 'lucide-react'

export default function DeveloperCard({ developer, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), { stiffness: 280, damping: 32 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), { stiffness: 280, damping: 32 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="retro-window overflow-hidden group cursor-default border-black/[0.08]"
      >
        <div className="retro-titlebar bg-[#fafafa]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted truncate">
            {developer.name}
          </span>
        </div>

        <div className="p-6 bg-win-bg relative" style={{ transform: 'translateZ(12px)' }}>
          <div
            className="w-14 h-14 rounded-md border overflow-hidden mb-4"
            style={{
              background: developer.avatarGradient,
              borderColor: developer.accentColor,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-white/95">
              {developer.initials}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-text-primary mb-0.5">
            {developer.name}
          </h3>
          <p className="text-xs font-medium mb-3 uppercase tracking-wide" style={{ color: developer.accentColor }}>
            {developer.role}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {developer.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#f7f7f5] border border-black/[0.06] text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {developer.links?.github && (
              <motion.a
                href={developer.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="retro-btn p-2"
                aria-label="GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {developer.links?.linkedin && (
              <motion.a
                href={developer.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="retro-btn retro-btn-blue p-2"
                aria-label="LinkedIn"
              >
                <Link2 className="w-4 h-4" />
              </motion.a>
            )}
            {developer.links?.website && (
              <motion.a
                href={developer.links.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="retro-btn retro-btn-purple p-2"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
