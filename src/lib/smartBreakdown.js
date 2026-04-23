/**
 * Rule-based milestone suggestions from a project title (no external API).
 * Matches first applicable pattern; otherwise returns a sensible generic plan.
 */

const PATTERNS = [
  {
    test: (t) => /\b(paper|essay|thesis|dissertation|10-?page|5-?page|history paper|term paper)\b/i.test(t),
    milestones: [
      'Confirm assignment requirements & rubric',
      'Brainstorm thesis & main arguments',
      'Find & skim 5–8 credible sources',
      'Build detailed outline',
      'Draft introduction & thesis paragraph',
      'Draft body sections (one at a time)',
      'Add citations & bibliography',
      'Revise for clarity & flow',
      'Proofread & final format check',
    ],
  },
  {
    test: (t) => /\b(presentation|slides|pitch|defense|oral)\b/i.test(t),
    milestones: [
      'Define audience & key message',
      'Storyboard slide flow',
      'Draft slides & speaker notes',
      'Gather visuals / data charts',
      'Practice run #1 (timing)',
      'Refine based on feedback',
      'Final rehearsal',
    ],
  },
  {
    test: (t) => /\b(exam|midterm|final|quiz|test prep|study for)\b/i.test(t),
    milestones: [
      'List all topics on the syllabus',
      'Rate confidence per topic (1–5)',
      'Schedule review blocks on calendar',
      'Active recall: key terms & formulas',
      'Practice problems / past papers',
      'Review weak areas only',
      'Light review & sleep the night before',
    ],
  },
  {
    test: (t) => /\b(group project|team project|capstone)\b/i.test(t),
    milestones: [
      'Align on roles & communication channel',
      'Break deliverables into owners & deadlines',
      'Draft shared timeline',
      'Integrate individual parts',
      'Internal review & fix gaps',
      'Prepare final submission package',
    ],
  },
  {
    test: (t) => /\b(lab|experiment|practical|lab report)\b/i.test(t),
    milestones: [
      'Read lab manual & safety notes',
      'List materials & pre-lab questions',
      'Run experiment & record raw data',
      'Process results & graphs',
      'Write analysis & conclusion',
      'Proofread report & units check',
    ],
  },
  {
    test: (t) => /\b(reading|textbook|chapter|novel|literature)\b/i.test(t),
    milestones: [
      'Preview headings & learning objectives',
      'First pass: notes in margins',
      'Summarize each section in your own words',
      'Make flashcards for key terms',
      'Self-quiz without looking back',
    ],
  },
  {
    test: (t) => /\b(application|resume|cv|cover letter|portfolio|scholarship)\b/i.test(t),
    milestones: [
      'Gather requirements & deadlines',
      'Brainstorm experiences & stories',
      'Draft core content',
      'Get one round of feedback',
      'Revise tone & length',
      'Final proofread & file naming',
      'Submit & log confirmation',
    ],
  },
  {
    test: (t) => /\b(project|assignment|homework|coursework)\b/i.test(t),
    milestones: [
      'Clarify scope & deliverables',
      'Break work into 4–6 concrete steps',
      'Estimate time per step',
      'Execute step 1 & check in',
      'Mid-project review & adjust plan',
      'Integration, polish & submit',
    ],
  },
]

const GENERIC = [
  'Write down the single outcome you want',
  'List 3–7 concrete sub-tasks',
  'Order them by dependencies',
  'Put the first step on your calendar',
  'Define “done” for each milestone',
  'Review after each chunk of progress',
]

/**
 * @param {string} projectTitle
 * @returns {{ milestones: string[], matched: string | null }}
 */
export function suggestMilestones(projectTitle) {
  const raw = (projectTitle || '').trim()
  if (!raw) {
    return { milestones: [...GENERIC], matched: null }
  }
  const lower = raw.toLowerCase()
  for (const p of PATTERNS) {
    if (p.test(lower)) {
      return { milestones: [...p.milestones], matched: 'pattern' }
    }
  }
  return { milestones: [...GENERIC], matched: 'generic' }
}
