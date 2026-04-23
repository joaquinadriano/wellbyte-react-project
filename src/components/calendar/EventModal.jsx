import { useState, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import { pad2, toYMD } from '../../lib/calendarUtils'

const COLORS = [
  { id: 'blue', label: 'Blue', swatch: 'bg-[#1a73e8]' },
  { id: 'green', label: 'Green', swatch: 'bg-[#188038]' },
  { id: 'red', label: 'Red', swatch: 'bg-[#d93025]' },
  { id: 'yellow', label: 'Yellow', swatch: 'bg-[#f9ab00]' },
  { id: 'purple', label: 'Purple', swatch: 'bg-[#9334e6]' },
  { id: 'orange', label: 'Orange', swatch: 'bg-[#fa903e]' },
  { id: 'gray', label: 'Gray', swatch: 'bg-[#5f6368]' },
]

function timeFromDate(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export default function EventModal({ open, onClose, event, anchorDate, onSave, onDelete }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allDay, setAllDay] = useState(false)
  const [color, setColor] = useState('blue')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [day, setDay] = useState('')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      setError('')
      if (event) {
        setTitle(event.title ?? '')
        setDescription(event.description ?? '')
        setAllDay(!!event.allDay)
        setColor(event.color ?? 'blue')
        if (event.allDay) {
          setStartDate(event.startDate ?? toYMD(new Date()))
          setEndDate(event.endDate ?? event.startDate ?? toYMD(new Date()))
          setDay(event.startDate ?? toYMD(new Date()))
        } else {
          const s = new Date(event.start)
          const e = new Date(event.end)
          setDay(toYMD(s))
          setTimeStart(timeFromDate(s))
          setTimeEnd(timeFromDate(e))
          setStartDate(toYMD(s))
          setEndDate(toYMD(e))
        }
      } else {
        const ymd = toYMD(anchorDate ?? new Date())
        setTitle('')
        setDescription('')
        setAllDay(false)
        setColor('blue')
        setStartDate(ymd)
        setEndDate(ymd)
        setDay(ymd)
        setTimeStart('09:00')
        setTimeEnd('10:00')
      }
    }, 0)
    return () => window.clearTimeout(t)
  }, [open, event, anchorDate])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Add a title for this event.')
      return
    }
    if (allDay) {
      if (!startDate || !endDate) {
        setError('Choose start and end dates.')
        return
      }
      if (startDate > endDate) {
        setError('End date must be on or after start date.')
        return
      }
      onSave({
        title: title.trim(),
        description: description.trim(),
        allDay: true,
        startDate,
        endDate,
        color,
      })
    } else {
      if (!day) {
        setError('Choose a date.')
        return
      }
      const [sh, sm] = timeStart.split(':').map(Number)
      const [eh, em] = timeEnd.split(':').map(Number)
      const start = new Date(day)
      start.setHours(sh, sm, 0, 0)
      const end = new Date(day)
      end.setHours(eh, em, 0, 0)
      if (end.getTime() <= start.getTime()) {
        setError('End time must be after start time.')
        return
      }
      onSave({
        title: title.trim(),
        description: description.trim(),
        allDay: false,
        start: start.toISOString(),
        end: end.toISOString(),
        color,
      })
    }
    onClose()
  }

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto retro-window rounded-t-lg sm:rounded-lg shadow-lg">
        <div className="sticky top-0 z-[1] flex items-center justify-between gap-2 px-4 py-3 border-b border-black/[0.06] bg-white">
          <h2 className="text-base font-semibold text-text-primary">
            {event ? 'Edit event' : 'New event'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-text-muted hover:bg-black/[0.05] hover:text-text-primary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="ev-title">
              Title
            </label>
            <input
              id="ev-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="retro-input w-full"
              placeholder="Event title"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1" htmlFor="ev-desc">
              Description
            </label>
            <textarea
              id="ev-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="retro-input retro-input-note w-full resize-y min-h-[72px]"
              placeholder="Notes, links, location…"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="ev-allday"
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="rounded border-black/[0.2] text-text-primary focus:ring-retro-blue/30"
            />
            <label htmlFor="ev-allday" className="text-sm font-medium text-text-primary">
              All day
            </label>
          </div>

          {allDay ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Starts</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="retro-input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Ends</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="retro-input w-full"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">Date</label>
                <input
                  type="date"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="retro-input w-full"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Starts</label>
                  <input
                    type="time"
                    value={timeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                    className="retro-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1">Ends</label>
                  <input
                    type="time"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                    className="retro-input w-full"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-text-muted mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => setColor(c.id)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    color === c.id ? 'border-text-primary scale-110' : 'border-transparent hover:scale-105'
                  }`}
                >
                  <span className={`block w-full h-full rounded-full ${c.swatch}`} />
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-black/[0.06]">
            {event?.id ? (
              <button
                type="button"
                onClick={handleDelete}
                className="retro-btn text-red-700 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2 sm:justify-end">
              <button type="button" onClick={onClose} className="retro-btn text-text-secondary">
                Cancel
              </button>
              <button type="submit" className="retro-btn retro-btn-pink">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
