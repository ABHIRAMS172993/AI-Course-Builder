export const overallProgress = {
  percentage: 68,
  completedTopics: 17,
  remainingTopics: 8,
  activeTopics: 1,
};

export const statsCards = [
  {
    id: 1,
    title: "Completed Topics",
    value: "17",
    subtitle: "+3 this week",
    progress: 68,
    color: "emerald",
    icon: "fa-solid fa-circle-check",
  },
  {
    id: 2,
    title: "Remaining Topics",
    value: "8",
    subtitle: "~14 hrs left",
    progress: 32,
    color: "blue",
    icon: "fa-solid fa-clock-rotate-left",
  },
  {
    id: 3,
    title: "Learning Streak",
    value: "12",
    subtitle: "Personal Best!",
    description: "Study today to reach 14-day badge",
    color: "orange",
    icon: "fa-solid fa-fire",
  },
  {
    id: 4,
    title: "Avg. Quiz Score",
    value: "85%",
    subtitle: "+5% this week",
    progress: 85,
    color: "amber",
    icon: "fa-solid fa-star",
  },
];

export const weeklyProgress = [
  { day: "Mon", hours: 3, height: 54, remaining: 16 },
  { day: "Tue", hours: 4.5, height: 81, remaining: 0 },
  { day: "Wed", hours: 2, height: 36, remaining: 34 },
  { day: "Thu", hours: 5, height: 90, remaining: 0 },
  { day: "Fri", hours: 3.5, height: 63, remaining: 7 },
  { day: "Sat", hours: 6, height: 108, remaining: 0 },
  { day: "Sun", hours: 1, height: 18, remaining: 52 },
];

export const activityCalendar = [
  "", "", "", 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, "",
];

export const recentActivities = [
  {
    title: "Completed JavaScript ES6 Basics",
    description: "Module 1 · Beginner · 45 min session",
    status: "Done",
    time: "2 days ago",
    icon: "fa-solid fa-circle-check",
    color: "emerald",
  },
  {
    title: "Scored 90% on HTML/CSS Fundamentals Quiz",
    description: "20 questions · AI-generated assessment",
    status: "90%",
    time: "3 days ago",
    icon: "fa-solid fa-star",
    color: "amber",
  },
  {
    title: "Started React Hooks & State Management",
    description: "Module 2 · Intermediate · Currently active",
    status: "Active",
    time: "5 days ago",
    icon: "fa-solid fa-play",
    color: "blue",
  },
  {
    title: "Opened 3 Tailwind CSS Resources",
    description: "1 course · 1 video · 1 documentation",
    status: "Resources",
    time: "6 days ago",
    icon: "fa-solid fa-book-open",
    color: "violet",
  },
  {
    title: "Generated AI Roadmap for Web Development",
    description: "Full-stack path · 25 topics curated",
    status: "AI Path",
    time: "1 week ago",
    icon: "fa-solid fa-wand-magic-sparkles",
    color: "blue",
  },
];

export const milestones = [
  {
    title: "First Roadmap Generated",
    description: "Started your AI learning journey",
    icon: "fa-solid fa-rocket",
    unlocked: true,
  },
  {
    title: "First Topic Completed",
    description: "Completed HTML5 Fundamentals",
    icon: "fa-solid fa-graduation-cap",
    unlocked: true,
  },
  {
    title: "7-Day Study Streak",
    description: "Studied 7 days in a row",
    icon: "fa-solid fa-fire",
    unlocked: true,
  },
  {
    title: "Beginner Level Cleared",
    description: "Completed 7 of 8 beginner topics",
    icon: "fa-solid fa-medal",
    unlocked: true,
  },
  {
    title: "Quiz Ace",
    description: "Scored 90%+ on 3 consecutive quizzes",
    icon: "fa-solid fa-star",
    unlocked: true,
  },
  {
    title: "14-Day Streak Master",
    description: "Study 2 more days to unlock",
    icon: "fa-solid fa-trophy",
    unlocked: false,
  },
  {
    title: "Intermediate Completer",
    description: "Finish all intermediate topics",
    icon: "fa-solid fa-layer-group",
    unlocked: false,
  },
  {
    title: "Full-Stack Graduate",
    description: "Complete the full roadmap",
    icon: "fa-solid fa-crown",
    unlocked: false,
  },
];