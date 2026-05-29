// ============================================================
// CII AI Training Hub — Core TypeScript Types
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================

export type UserRole = 'admin' | 'faculty' | 'student';

export type AILevel = 'Advanced' | 'Intermediate' | 'Applied-Science' | 'Business-AI' | 'Creative-AI';

export type DegreeStream = 'Tech-Core' | 'Tech-Adjacent' | 'Science' | 'Commerce' | 'Arts';

export type SessionType = 'Live Lecture' | 'Hands-on Lab' | 'Hackathon' | 'Guest Lecture' | 'Workshop' | 'Assessment Session';

export type ContentType = 'video' | 'pdf' | 'text' | 'quiz' | 'assignment' | 'code';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type CertificateType =
  | 'Module Completion'
  | 'Session Attendance'
  | 'Project Completion'
  | 'Course Completion'
  | 'Hackathon Participation'
  | 'Excellence';

// ─── User ───────────────────────────────────────────────────
export interface User {
  id: string;
  username: string;
  email: string;
  mobile?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Student extends User {
  rollNo: string;
  name: string;
  degreeId: string;
  degreeName: string;
  degreeCode: string;
  stream: DegreeStream;
  year: 1 | 2 | 3;
  batch: string;
  section?: string;
  photoUrl?: string;
  joinedAt: string;
  points: number;
  streak: number;
  badges: Badge[];
  rank?: number;
}

export interface Faculty extends User {
  empId: string;
  name: string;
  department: string;
  designation: string;
  assignedDegrees: string[];
  joinedAt: string;
  photoUrl?: string;
}

export interface Admin extends User {
  name: string;
  level: 1 | 2;
}

// ─── Degrees ─────────────────────────────────────────────────
export interface Degree {
  id: string;
  code: string;
  name: string;
  stream: DegreeStream;
  durationYears: 2 | 3;
  aiLevel: AILevel;
  totalStudents: number;
}

// ─── Modules & Lessons ────────────────────────────────────────
export interface Module {
  id: string;
  title: string;
  description: string;
  orderNo: number;
  degreeIds: string[];
  yearLevel: 1 | 2 | 3;
  createdBy: string;
  isPublished: boolean;
  totalLessons: number;
  totalDuration: number; // seconds
  completionRate?: number; // 0–100
  thumbnailUrl?: string;
  tags: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  contentType: ContentType;
  contentUrl?: string;
  description?: string;
  durationSec: number;
  orderNo: number;
  isCompleted?: boolean;
  timeSpentSec?: number;
}

// ─── Sessions ─────────────────────────────────────────────────
export interface Session {
  id: string;
  title: string;
  facultyId: string;
  facultyName: string;
  degreeIds: string[];
  yearLevel: 1 | 2 | 3 | null;
  scheduledAt: string;
  durationMin: number;
  type: SessionType;
  meetLink?: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  description?: string;
  recordingUrl?: string;
  maxParticipants?: number;
  enrolledCount?: number;
  isAttended?: boolean;
}

// ─── Quizzes ─────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  marks: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimitMin: number;
  maxAttempts: number;
  passingScore: number; // percentage
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  maxScore: number;
  startedAt: string;
  submittedAt: string;
  answers: Record<string, string | string[]>;
  passed: boolean;
}

// ─── Assignments ──────────────────────────────────────────────
export interface Assignment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  dueDays: number;
  rubricUrl?: string;
  maxMarks: number;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  assignmentId: string;
  fileUrl?: string;
  textContent?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedBy?: string;
  status: 'submitted' | 'graded' | 'late' | 'returned';
}

// ─── Progress ────────────────────────────────────────────────
export interface StudentProgress {
  studentId: string;
  moduleId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  timeSpentSec: number;
  completedAt?: string;
  percentComplete: number;
}

export interface OverallProgress {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  totalTimeSpentSec: number;
  percentComplete: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  rank: number;
}

// ─── Ideas ───────────────────────────────────────────────────
export interface Idea {
  id: string;
  title: string;
  description: string;
  degreeTags: string[];
  streamTags: DegreeStream[];
  difficulty: Difficulty;
  techStack: string[];
  durationWeeks: number;
  category: string;
  createdAt: string;
  viewCount: number;
  similarSolutions?: string[];
  mentorRecommendation?: string;
  isBookmarked?: boolean;
}

// ─── AI Tools ────────────────────────────────────────────────
export interface AITool {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  logoUrl?: string;
  isPaid: boolean;
  tags: string[];
  clickCount?: number;
  isFeatured?: boolean;
  addedAt: string;
}

// ─── Certificates ────────────────────────────────────────────
export interface Certificate {
  id: string;
  certId: string;
  studentId: string;
  studentName: string;
  type: CertificateType;
  moduleName?: string;
  issuedAt: string;
  verificationUrl: string;
  qrCode: string;
}

// ─── Badges ──────────────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  icon: string;
  earnedAt: string;
  color: string;
}

// ─── Announcements ───────────────────────────────────────────
export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  targetRoles: UserRole[];
  targetDegrees?: string[];
  priority: 'low' | 'medium' | 'high';
}

// ─── Analytics ───────────────────────────────────────────────
export interface SystemStats {
  activeUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalModules: number;
  publishedModules: number;
  totalSessions: number;
  completedSessions: number;
  avgCompletionRate: number;
  dau: number;
  mau: number;
}

export interface UsageHeatmapData {
  hour: number;
  day: string;
  count: number;
}

// ─── Auth ────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: Student | Faculty | Admin | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── API Response ────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  total?: number;
  page?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── Reports ─────────────────────────────────────────────────
export interface ReportFilter {
  degreeId?: string;
  year?: number;
  batch?: string;
  from?: string;
  to?: string;
  format?: 'pdf' | 'xlsx' | 'csv';
}

// ─── Navigation ──────────────────────────────────────────────
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  badge?: number;
  children?: NavItem[];
}
