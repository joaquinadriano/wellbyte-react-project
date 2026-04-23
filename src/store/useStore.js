import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  localYmdPlus,
  toLocalYMD,
  isTaskOverdue,
  isDueWithinDays,
} from '../lib/timeManagement'

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const defaultTasks = [
  {
    id: generateId(),
    title: 'Complete React project documentation',
    description: 'Write comprehensive docs for the wellness tracker',
    priority: 'high',
    status: 'in-progress',
    dueDate: localYmdPlus(3),
    estimatedMinutes: 90,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Morning meditation session',
    description: '15 minutes of mindfulness practice',
    priority: 'medium',
    status: 'completed',
    dueDate: null,
    estimatedMinutes: 15,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: generateId(),
    title: 'Review SDG 3 & 4 materials',
    description: 'Study UN Sustainable Development Goals for health and education',
    priority: 'high',
    status: 'todo',
    dueDate: localYmdPlus(7),
    estimatedMinutes: 60,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: generateId(),
    title: 'Take a 30-minute walk',
    description: 'Get some fresh air and exercise',
    priority: 'low',
    status: 'todo',
    dueDate: localYmdPlus(1),
    estimatedMinutes: 30,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
]

let currentStorageName = 'wellbyte-storage'

const useStore = create(
  persist(
    (set, get) => ({
      tasks: defaultTasks,
      moodEntries: [],
      calendarEvents: [],
      filterStatus: 'all',
      filterPriority: 'all',
      filterDue: 'all',
      pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
      quote: null,
      quoteLoading: false,

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              ...task,
              id: generateId(),
              createdAt: new Date().toISOString(),
              dueDate: task.dueDate || null,
              estimatedMinutes:
                task.estimatedMinutes != null && task.estimatedMinutes !== ''
                  ? Number(task.estimatedMinutes)
                  : null,
            },
            ...state.tasks,
          ],
        })),

      addTasksFromMilestones: (titles, options = {}) =>
        set((state) => {
          const parent = options.parentTitle?.trim()
          const descPrefix = parent ? `Milestone — ${parent}` : ''
          const newOnes = titles.map((title) => ({
            id: generateId(),
            title: title.trim(),
            description: descPrefix,
            priority: options.priority ?? 'medium',
            status: 'todo',
            dueDate: options.dueDate ?? null,
            estimatedMinutes: options.estimatedMinutesPerStep ?? null,
            createdAt: new Date().toISOString(),
          }))
          return { tasks: [...newOnes, ...state.tasks] }
        }),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' }
              : t
          ),
        })),

      setFilterStatus: (status) => set({ filterStatus: status }),
      setFilterPriority: (priority) => set({ filterPriority: priority }),
      setFilterDue: (v) => set({ filterDue: v }),

      getFilteredTasks: () => {
        const { tasks, filterStatus, filterPriority, filterDue } = get()
        return tasks.filter((t) => {
          const statusMatch = filterStatus === 'all' || t.status === filterStatus
          const priorityMatch = filterPriority === 'all' || t.priority === filterPriority
          if (!statusMatch || !priorityMatch) return false
          if (filterDue === 'all') return true
          if (filterDue === 'has_due') return Boolean(t.dueDate)
          if (t.status === 'completed') return false
          if (filterDue === 'overdue') return isTaskOverdue(t)
          if (filterDue === 'week') {
            if (!t.dueDate) return false
            return isDueWithinDays(t, 7, true)
          }
          return true
        })
      },

      incrementPomodoro: () =>
        set((state) => {
          const today = toLocalYMD()
          const log = state.pomodoroLog
          if (!log || log.dateYmd !== today) {
            return { pomodoroLog: { dateYmd: today, completedWorkSessions: 1 } }
          }
          return {
            pomodoroLog: {
              ...log,
              completedWorkSessions: (log.completedWorkSessions || 0) + 1,
            },
          }
        }),

      addMoodEntry: (entry) =>
        set((state) => ({
          moodEntries: [
            { ...entry, id: generateId(), timestamp: new Date().toISOString() },
            ...state.moodEntries,
          ],
        })),

      addCalendarEvent: (ev) =>
        set((state) => ({
          calendarEvents: [{ ...ev, id: generateId() }, ...state.calendarEvents],
        })),

      updateCalendarEvent: (id, updates) =>
        set((state) => ({
          calendarEvents: state.calendarEvents.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),

      deleteCalendarEvent: (id) =>
        set((state) => ({
          calendarEvents: state.calendarEvents.filter((e) => e.id !== id),
        })),

      setQuote: (quote) => set({ quote }),
      setQuoteLoading: (loading) => set({ quoteLoading: loading }),

      fetchQuote: async () => {
        set({ quoteLoading: true })
        try {
          const res = await fetch('https://api.quotable.io/quotes/random?tags=wisdom|happiness|life')
          if (res.ok) {
            const data = await res.json()
            if (data && data[0]) {
              set({ quote: { text: data[0].content, author: data[0].author }, quoteLoading: false })
              return
            }
          }
          throw new Error('API unavailable')
        } catch {
          const fallbacks = [
            { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
            { text: "Well-being is attained little by little, and is no little thing itself.", author: "Zeno of Citium" },
            { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
            { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
            { text: "The mind is everything. What you think you become.", author: "Buddha" },
            { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
          ]
          set({
            quote: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            quoteLoading: false,
          })
        }
      },
    }),
    {
      name: currentStorageName,
      partialize: (state) => ({
        tasks: state.tasks,
        moodEntries: state.moodEntries,
        calendarEvents: state.calendarEvents,
        pomodoroLog: state.pomodoroLog,
      }),
    }
  )
)

export function hydrateForUser(uid) {
  const name = uid ? `wellbyte-${uid}` : 'wellbyte-storage'
  if (name === currentStorageName) return
  currentStorageName = name

  const raw = localStorage.getItem(name)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      const data = parsed?.state ?? {}
      useStore.setState({
        tasks: data.tasks ?? defaultTasks,
        moodEntries: data.moodEntries ?? [],
        calendarEvents: data.calendarEvents ?? [],
        pomodoroLog: data.pomodoroLog ?? { dateYmd: '', completedWorkSessions: 0 },
        filterStatus: 'all',
        filterPriority: 'all',
        filterDue: 'all',
      })
    } catch {
      useStore.setState({
        tasks: defaultTasks,
        moodEntries: [],
        calendarEvents: [],
        pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
        filterStatus: 'all',
        filterPriority: 'all',
        filterDue: 'all',
      })
    }
  } else {
    useStore.setState({
      tasks: defaultTasks,
      moodEntries: [],
      calendarEvents: [],
      pomodoroLog: { dateYmd: '', completedWorkSessions: 0 },
      filterStatus: 'all',
      filterPriority: 'all',
      filterDue: 'all',
    })
  }

  useStore.persist.setOptions({ name })
  useStore.persist.rehydrate()
}

export default useStore
