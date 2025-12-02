# Valiant Vocab - Visual Structure

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ╔═══════╗                                             │
│  ║ 🔥 5  ║  <- Streak Badge (fixed top-left)          │
│  ╚═══════╝                                             │
│                                                         │
│                                                         │
│     ┌───────────────────────────────────────┐          │
│     │   WORD OF THE DAY                     │          │
│     │                                       │          │
│     │         ephemeral                     │          │
│     │         adjective                     │          │
│     │                                       │          │
│     │  Lasting for a very short time;      │          │
│     │  transient.                           │          │
│     │                                       │          │
│     │  ┌─────────────────────────────────┐ │          │
│     │  │ ephemeral ≠ eternal             │ │          │
│     │  │ (opposite meanings)             │ │          │
│     │  └─────────────────────────────────┘ │          │
│     │                                       │          │
│     │  Write a sentence using this word:   │          │
│     │                                       │          │
│     │  ┌─────────────────────────────────┐ │          │
│     │  │ Type your sentence...           │ │          │
│     │  └─────────────────────────────────┘ │          │
│     │                                       │          │
│     │  💡 Try writing a more complete      │          │
│     │     sentence                          │          │
│     │                                       │          │
│     │  ┌─────────────────────────────────┐ │          │
│     │  │ ✓ Correct! +1 streak            │ │          │
│     │  │                                 │ │          │
│     │  │ Your sentence effectively uses  │ │          │
│     │  │ 'ephemeral' to describe...      │ │          │
│     │  └─────────────────────────────────┘ │          │
│     │                                       │          │
│     └───────────────────────────────────────┘          │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

Gradient Background (calm blue-gray)
```

## Component Breakdown

```
<App>
│
├── <StreakBadge>
│   └── Shows: 🔥 {streak}
│
└── <WordCard>
    │
    ├── Title: "WORD OF THE DAY"
    │
    ├── Word Display
    │   ├── Word: "ephemeral" (3rem, bold)
    │   └── Part of Speech: "adjective" (italic)
    │
    ├── Definition
    │   └── "Lasting for a very short time..."
    │
    ├── <ContrastTip>
    │   └── "ephemeral ≠ eternal"
    │
    ├── Input Section
    │   ├── Label
    │   ├── <input> (auto-focused)
    │   └── Pre-check Message
    │
    └── Feedback Section
        └── <FeedbackBox>
            ├── Header (✓ or ❌)
            ├── Main Text
            └── Extra (explanation/suggestion)
```

## User Flow

```
┌──────────────┐
│  Page Load   │
└──────┬───────┘
       │
       ├─> Load word of day
       ├─> Load saved streak
       └─> Auto-focus input
              │
              v
       ┌──────────────┐
       │  User Types  │
       └──────┬───────┘
              │
              ├─> Pre-check: Length OK?
              ├─> Pre-check: Word included?
              └─> Show hints (non-blocking)
                     │
                     v
              ┌──────────────┐
              │ Press Enter  │
              └──────┬───────┘
                     │
                     ├─> Basic validation
                     │   (empty? too short? missing word?)
                     │
                     ├─> AI validation
                     │   (send to OpenAI API)
                     │   [or fallback if no key]
                     │
                     v
              ┌──────────────┐
              │   Feedback   │
              └──────┬───────┘
                     │
                     ├─> If Correct:
                     │   ├─> Show success message
                     │   ├─> Increment streak (if first today)
                     │   ├─> Save to localStorage
                     │   └─> Clear input
                     │
                     └─> If Incorrect:
                         ├─> Show error message
                         ├─> Provide suggestion
                         └─> Keep input (let user edit)
```

## State Management

```
App State (via hooks):
├── wordData (from getWordOfTheDay)
├── streak (from useStreak hook)
├── lastCompletedDate (from useStreak hook)
└── todayCompleted (from useStreak hook)

WordCard State:
├── sentence (current input)
├── preCheckMessage (hint text)
├── preCheckType (info/warning)
├── feedback (success/error object)
└── isLoading (API call in progress)

localStorage:
{
  "valiantVocabState": {
    "streak": 5,
    "lastCompletedDate": "2025-11-30"
  }
}
```

## Data Flow Diagram

```
┌────────────┐      ┌──────────────┐      ┌─────────────┐
│   User     │─────>│  WordCard    │─────>│ apiService  │
│  (typing)  │      │  Component   │      │             │
└────────────┘      └──────┬───────┘      └──────┬──────┘
                           │                     │
                           │                     v
                           │              ┌─────────────┐
                           │              │  OpenAI API │
                           │              └──────┬──────┘
                           │                     │
                           │<────────────────────┘
                           │    (validation result)
                           │
                           v
                    ┌──────────────┐
                    │ FeedbackBox  │
                    │  Component   │
                    └──────────────┘
                           │
                           v
                    ┌──────────────┐
                    │  useStreak   │
                    │    Hook      │
                    └──────┬───────┘
                           │
                           v
                    ┌──────────────┐
                    │ localStorage │
                    └──────────────┘
```

## Color Scheme

```
Background:
├── Gradient: #f5f7fa → #e8ecf1 (light blue-gray)

Card:
├── Background: white
├── Shadow: rgba(0, 0, 0, 0.1)
└── Border Radius: 20px

Text Colors:
├── Titles: #718096 (gray)
├── Word: #1a202c (dark)
├── Definition: #4a5568 (medium gray)
└── Body text: #2d3748

Interactive Elements:
├── Input border: #e2e8f0 (light gray)
├── Input focus: #3b82f6 (blue)
├── Warning: #f97316 (orange)
└── Info: #3b82f6 (blue)

Feedback:
├── Success background: #d1fae5 (light green)
├── Success border: #10b981 (green)
├── Error background: #fee2e2 (light red)
└── Error border: #ef4444 (red)

Contrast Tip:
├── Background: #fef3c7 (light yellow)
└── Border: #f59e0b (amber)
```

## Responsive Breakpoints

```
Desktop (> 640px):
├── Word size: 3rem
├── Card padding: 3rem 2.5rem
└── Streak badge: 1.5rem from edges

Mobile (≤ 640px):
├── Word size: 2.25rem
├── Card padding: 2rem 1.5rem
└── Streak badge: 1rem from edges
```

