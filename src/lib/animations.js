export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const springHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
}

export const taskItem = {
  initial: { opacity: 0, height: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    height: "auto",
    scale: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.25, delay: 0.1 },
      scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    scale: 0.8,
    transition: {
      height: { duration: 0.25, delay: 0.1 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
}

export const filterPill = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 500, damping: 30 },
}
