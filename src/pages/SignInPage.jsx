import { motion } from 'framer-motion'
import { Shield, BookOpen, Heart, AlertTriangle } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const features = [
  {
    icon: BookOpen,
    title: 'Track your tasks',
    description: 'Organize assignments, goals, and daily habits in one calm view.',
    color: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  {
    icon: Heart,
    title: 'Monitor wellness',
    description: 'Log mood over time and notice patterns without the noise.',
    color: 'bg-rose-50 text-rose-900 border-rose-200',
  },
  {
    icon: Shield,
    title: 'Private & secure',
    description: 'Your data stays yours, synced to your UST CICS Google account.',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
]

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function SignInPage() {
  const { signInWithGoogle, error, configured } = useAuthStore()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary mb-2">
            Welcome to WellByte
          </h1>
          <p className="text-[15px] text-text-secondary leading-relaxed">
            Your productivity and wellness workspace — clear, quiet, and focused. Framed around the spirit of UN SDGs 3 and 4.
          </p>
          <p className="text-sm text-text-muted mt-4 leading-relaxed max-w-sm mx-auto">
            Sign-in is limited to <span className="font-mono text-text-secondary">*.cics@ust.edu.ph</span>{' '}
            (UST CICS Google Workspace).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="retro-window overflow-hidden mb-8"
        >
          <div className="retro-titlebar">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">Sign in</span>
          </div>
          <div className="p-6">
            {!configured && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-start gap-3 p-4 rounded-md bg-amber-50 border border-amber-200"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">Firebase not configured</p>
                  <p className="text-xs text-amber-800/90 leading-relaxed">
                    Copy <code className="px-1 py-0.5 rounded bg-amber-100/80 text-amber-900 text-[11px] font-mono">.env.example</code> to{' '}
                    <code className="px-1 py-0.5 rounded bg-amber-100/80 text-amber-900 text-[11px] font-mono">.env</code> and add your
                    Firebase project credentials, then restart the dev server.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              onClick={signInWithGoogle}
              disabled={!configured}
              className="
                retro-btn w-full flex items-center justify-center gap-3
                py-3 text-sm font-semibold bg-white
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-red-700 text-center bg-red-50 border border-red-200 rounded-md px-4 py-2.5 font-medium"
              >
                {error}
              </motion.p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-black/[0.06]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">Firebase auth</span>
              <div className="flex-1 h-px bg-black/[0.06]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-md bg-white border border-black/[0.06] hover:border-black/[0.1] transition-colors"
            >
              <div className={`w-9 h-9 rounded-md border flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                <feature.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{feature.title}</p>
                <p className="text-xs text-text-muted leading-relaxed mt-0.5">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
