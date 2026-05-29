// ============================================================
// CII AI Training Hub — Mock data (modules, students, faculty)
// ============================================================
import type { Module, Student, Faculty, Session, Announcement, Badge, OverallProgress } from '../types';

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'AI Starter', description: 'Completed your first AI lesson', icon: '🚀', color: '#2C5BDC', earnedAt: '2026-05-01' },
  { id: 'b2', name: 'Prompt Master', description: 'Completed Prompt Engineering module', icon: '✨', color: '#F5A623', earnedAt: '2026-05-10' },
  { id: 'b3', name: 'Vibe Coder', description: 'Built your first app with AI tools', icon: '💻', color: '#22C55E', earnedAt: '2026-05-15' },
  { id: 'b4', name: '7-Day Streak', description: 'Logged in 7 consecutive days', icon: '🔥', color: '#EF4444', earnedAt: '2026-05-20' },
];

export const MOCK_STUDENT: Student = {
  id: 's001',
  username: 'BSC_CSAI_2024_001',
  email: 'riya.sharma@rgu.edu.in',
  mobile: '9876543210',
  role: 'student',
  isActive: true,
  createdAt: '2024-06-01',
  lastLogin: '2026-05-27T12:00:00Z',
  rollNo: 'BSC_CSAI_2024_001',
  name: 'Riya Sharma',
  degreeId: 'd25',
  degreeName: 'BSC CS AI',
  degreeCode: 'BSC_CSAI',
  stream: 'Tech-Core',
  year: 2,
  batch: '2024-27',
  section: 'A',
  photoUrl: undefined,
  joinedAt: '2024-06-01',
  points: 1240,
  streak: 12,
  badges: MOCK_BADGES,
  rank: 7,
};

export const MOCK_FACULTY: Faculty = {
  id: 'f001',
  username: 'fac_anjit_raja',
  email: 'anjit.raja@rgu.edu.in',
  mobile: '9876543200',
  role: 'faculty',
  isActive: true,
  createdAt: '2024-01-01',
  lastLogin: '2026-05-27T11:00:00Z',
  empId: 'RGU-FAC-001',
  name: 'Prof. R. Anjit Raja',
  department: 'Centre for Innovation and Incubation',
  designation: 'Professor & Director',
  assignedDegrees: ['d16', 'd17', 'd18', 'd25', 'd26'],
  joinedAt: '2024-01-01',
};

export const MOCK_MODULES: Module[] = [
  { id: 'm01', title: 'Module A: AI Literacy Foundation', description: 'Start from zero — understand what AI is, how it works, and explore the ecosystem of modern AI tools in 2026.', orderNo: 1, degreeIds: ['all'], yearLevel: 1, createdBy: 'f001', isPublished: true, totalLessons: 24, totalDuration: 86400, completionRate: 78, tags: ['foundation', 'AI', 'beginner'], thumbnailUrl: undefined },
  { id: 'm02', title: 'Module B: Prompt Engineering Mastery', description: 'Master the art of communicating with AI — from zero-shot prompts to complex agentic workflows.', orderNo: 2, degreeIds: ['all'], yearLevel: 1, createdBy: 'f001', isPublished: true, totalLessons: 18, totalDuration: 64800, completionRate: 62, tags: ['prompt', 'LLM', 'intermediate'], thumbnailUrl: undefined },
  { id: 'm03', title: 'Module C: Vibe Coding with AI', description: 'Build full-stack apps using natural language. Cursor, Bolt.new, Lovable, v0 — the complete toolkit.', orderNo: 3, degreeIds: ['d16','d17','d18','d19','d20','d21','d23','d24','d25','d26','d27','d28','d29','d30'], yearLevel: 2, createdBy: 'f001', isPublished: true, totalLessons: 30, totalDuration: 108000, completionRate: 45, tags: ['vibe-coding', 'fullstack', 'advanced'], thumbnailUrl: undefined },
  { id: 'm04', title: 'Module D: Programming Fundamentals', description: 'Frontend, backend and Python tracks — learn to code with AI assistance from scratch.', orderNo: 4, degreeIds: ['d16','d17','d18','d20','d21','d25','d26'], yearLevel: 1, createdBy: 'f001', isPublished: true, totalLessons: 36, totalDuration: 129600, completionRate: 34, tags: ['programming', 'python', 'web'], thumbnailUrl: undefined },
  { id: 'm05', title: 'Module E: AI Tools for Your Discipline', description: 'Domain-specific AI tools and workflows tailored to your degree stream.', orderNo: 5, degreeIds: ['all'], yearLevel: 1, createdBy: 'f001', isPublished: true, totalLessons: 20, totalDuration: 72000, completionRate: 55, tags: ['domain', 'tools', 'applied'], thumbnailUrl: undefined },
  { id: 'm06', title: 'Module F: Website & App Building Projects', description: 'Build real websites and apps for your department use case using no-code and AI tools.', orderNo: 6, degreeIds: ['all'], yearLevel: 2, createdBy: 'f001', isPublished: true, totalLessons: 16, totalDuration: 57600, completionRate: 28, tags: ['projects', 'web', 'app'], thumbnailUrl: undefined },
  { id: 'm07', title: 'Module G: Industry Case Studies', description: '12 real-world AI case studies from Netflix, Tesla, JPMorgan, NPCI and Indian startups.', orderNo: 7, degreeIds: ['all'], yearLevel: 2, createdBy: 'f001', isPublished: true, totalLessons: 12, totalDuration: 43200, completionRate: 71, tags: ['casestudy', 'industry', 'real-world'], thumbnailUrl: undefined },
  { id: 'm08', title: 'Module H: AI for Research & Innovation', description: 'For PG students — AI-powered literature review, thesis writing, grant proposals and research tools.', orderNo: 8, degreeIds: ['d36','d37','d38','d39','d40','d41','d42','d43','d44','d45'], yearLevel: 2, createdBy: 'f001', isPublished: true, totalLessons: 14, totalDuration: 50400, completionRate: 42, tags: ['research', 'PG', 'innovation'], thumbnailUrl: undefined },
];

export const MOCK_SESSIONS: Session[] = [
  { id: 'ses01', title: 'AI Basics Day — ChatGPT, Claude & Gemini Hands-on', facultyId: 'f001', facultyName: 'Prof. R. Anjit Raja', degreeIds: ['all'], yearLevel: 1, scheduledAt: '2026-05-28T09:00:00', durationMin: 180, type: 'Hands-on Lab', meetLink: 'https://meet.google.com/cii-ai-001', status: 'upcoming', description: 'Day 1 intensive — explore all major AI chatbots hands-on', enrolledCount: 85, maxParticipants: 100 },
  { id: 'ses02', title: 'Prompt Engineering Masterclass', facultyId: 'f001', facultyName: 'Prof. R. Anjit Raja', degreeIds: ['d25','d26','d21'], yearLevel: 2, scheduledAt: '2026-05-29T10:00:00', durationMin: 120, type: 'Live Lecture', meetLink: 'https://meet.google.com/cii-ai-002', status: 'upcoming', description: '50 live prompt engineering exercises', enrolledCount: 42, maxParticipants: 60 },
  { id: 'ses03', title: 'Vibe Coding — Build a Website in 30 Minutes', facultyId: 'f001', facultyName: 'Prof. R. Anjit Raja', degreeIds: ['d25','d17','d20'], yearLevel: 2, scheduledAt: '2026-05-30T14:00:00', durationMin: 90, type: 'Workshop', meetLink: 'https://meet.google.com/cii-ai-003', status: 'upcoming', description: 'Live vibe coding session using Bolt.new and Lovable', enrolledCount: 38, maxParticipants: 50 },
  { id: 'ses04', title: 'Hackathon Day — 6-Hour AI Build Challenge', facultyId: 'f001', facultyName: 'Prof. R. Anjit Raja', degreeIds: ['all'], yearLevel: null, scheduledAt: '2026-06-01T09:00:00', durationMin: 360, type: 'Hackathon', status: 'upcoming', description: 'Build an AI product in 6 hours. Top 3 teams win prizes!', enrolledCount: 124, maxParticipants: 150 },
  { id: 'ses05', title: 'Guest Lecture: AI in Indian Fintech (NPCI)', facultyId: 'f002', facultyName: 'Dr. Arun Prakash', degreeIds: ['d04','d05','d07','d11'], yearLevel: 3, scheduledAt: '2026-06-03T11:00:00', durationMin: 60, type: 'Guest Lecture', status: 'upcoming', description: 'Special session by NPCI expert on UPI fraud detection AI', enrolledCount: 67, maxParticipants: 100 },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: '🎉 Welcome to CII AI Training Hub 2026!', content: 'The Centre for Innovation and Incubation is proud to launch the AI Training Portal for all 46 degree programs. Your AI journey starts today!', createdBy: 'cii_admin1', createdAt: '2026-05-15T09:00:00', targetRoles: ['student', 'faculty'], priority: 'high' },
  { id: 'a2', title: '📅 Day 1 AI Basics Session — Tomorrow 9 AM', content: 'All Year 1 students are invited to attend the AI Basics Day session tomorrow. Join via the Sessions tab. Bring your laptop!', createdBy: 'f001', createdAt: '2026-05-27T08:00:00', targetRoles: ['student'], priority: 'medium' },
  { id: 'a3', title: '🏆 Hackathon Registration Open', content: 'Register for the June 1 AI Hackathon now. Teams of 2-4 students. Over ₹50,000 in prizes. Registration closes May 30.', createdBy: 'cii_admin1', createdAt: '2026-05-25T10:00:00', targetRoles: ['student'], priority: 'medium' },
  { id: 'a4', title: '📚 New Module Published: Vibe Coding', content: 'Module C: Vibe Coding with AI is now available for Tech stream Year 2 students. 30 lessons, 10 hands-on labs.', createdBy: 'f001', createdAt: '2026-05-20T14:00:00', targetRoles: ['student'], priority: 'low' },
];

export const MOCK_PROGRESS: OverallProgress = {
  totalModules: 8,
  completedModules: 2,
  totalLessons: 170,
  completedLessons: 47,
  totalTimeSpentSec: 86400,
  percentComplete: 28,
  currentStreak: 12,
  longestStreak: 14,
  points: 1240,
  rank: 7,
};

export const LEADERBOARD = [
  { rank: 1, name: 'Arjun Krishnamurthy', degree: 'BSC CS AI', points: 2340, streak: 28, badge: '🏆' },
  { rank: 2, name: 'Priya Venkataraman', degree: 'BSC AIML', points: 2190, streak: 21, badge: '🥈' },
  { rank: 3, name: 'Karthik Sundaram', degree: 'MSC DSBA', points: 2045, streak: 19, badge: '🥉' },
  { rank: 4, name: 'Divya Rajasekaran', degree: 'BCA DevOps', points: 1890, streak: 17, badge: '⭐' },
  { rank: 5, name: 'Siddharth Narayanan', degree: 'BSC CS PRO', points: 1756, streak: 15, badge: '⭐' },
  { rank: 6, name: 'Meera Chandrasekaran', degree: 'BSC AIDS PRO', points: 1623, streak: 13, badge: '⭐' },
  { rank: 7, name: 'Riya Sharma', degree: 'BSC CS AI', points: 1240, streak: 12, badge: '📚', isCurrentUser: true },
  { rank: 8, name: 'Vijay Annamalai', degree: 'BSC CSDS', points: 1198, streak: 10, badge: '📚' },
  { rank: 9, name: 'Lavanya Murugesan', degree: 'BSC DSA', points: 1134, streak: 9, badge: '📚' },
  { rank: 10, name: 'Rohit Subramanian', degree: 'MSC CS', points: 1089, streak: 8, badge: '📚' },
];
