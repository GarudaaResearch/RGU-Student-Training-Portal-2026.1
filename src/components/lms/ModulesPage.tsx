// ============================================================
// Learning Modules Page — Microsoft Learn / Fluent Design
// ============================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_MODULES } from '../../data/mockData';
import { MOCK_LESSONS_BY_MODULE, type DetailedLesson } from '../../data/mockLessons';
import { 
  BookOpen, Clock, Tag, ChevronRight, Search, Play, CheckCircle, 
  Lock, ArrowLeft, Check, FileText, Code, HelpCircle, Send, Terminal, 
  Volume2, Maximize2, RotateCcw, Upload, File
} from 'lucide-react';

const TAG_COLORS: Record<string, string> = {
  foundation: 'badge-indigo', AI: 'badge-violet', beginner: 'badge-green',
  prompt: 'badge-cyan', LLM: 'badge-indigo', intermediate: 'badge-amber',
  'vibe-coding': 'badge-violet', fullstack: 'badge-indigo', advanced: 'badge-red',
  programming: 'badge-green', python: 'badge-cyan', web: 'badge-amber',
  domain: 'badge-indigo', tools: 'badge-cyan', applied: 'badge-green',
  projects: 'badge-violet', app: 'badge-indigo', casestudy: 'badge-amber',
  industry: 'badge-cyan', 'real-world': 'badge-green', research: 'badge-violet',
  PG: 'badge-red', innovation: 'badge-indigo',
};

const MODULE_EMOJIS = ['🤖', '✨', '💻', '🐍', '🔧', '🌐', '📊', '🔬'];

export default function ModulesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'inprogress' | 'completed'>('all');
  
  // Navigation & Active state
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Track lessons and completion states dynamically in state
  const [localModules, setLocalModules] = useState(MOCK_MODULES);
  const [moduleLessons, setModuleLessons] = useState<DetailedLesson[]>([]);

  // Simulation states for lesson interactive content
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [codeRunning, setCodeRunning] = useState(false);
  const [codeRunDone, setCodeRunDone] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentGrade, setAssignmentGrade] = useState<{ grade: string; feedback: string } | null>(null);

  // Sync lessons when module changes
  useEffect(() => {
    if (selectedModuleId) {
      const lessons = MOCK_LESSONS_BY_MODULE[selectedModuleId] || [];
      setModuleLessons(lessons);
      
      // Reset simulator states
      setQuizAnswers({});
      setQuizSubmitted(false);
      setCodeRunning(false);
      setCodeRunDone(false);
      setUploadedFileName(null);
      setAssignmentSubmitted(false);
      setAssignmentGrade(null);
    }
  }, [selectedModuleId]);

  // Sync active lesson content states when active lesson changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCodeRunning(false);
    setCodeRunDone(false);
    setUploadedFileName(null);
    setAssignmentSubmitted(false);
    setAssignmentGrade(null);
  }, [activeLessonId]);

  // Handle card click
  const handleCardClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveLessonId(null); // start in overview mode
  };

  // Mark a lesson complete dynamically
  const markLessonComplete = (lessonId: string) => {
    const updatedLessons = moduleLessons.map(les => {
      if (les.id === lessonId) {
        return { ...les, isCompleted: true };
      }
      return les;
    });
    setModuleLessons(updatedLessons);

    // Recalculate module progress
    if (selectedModuleId) {
      const total = updatedLessons.length;
      const completed = updatedLessons.filter(l => l.isCompleted).length;
      const newRate = Math.round((completed / total) * 100);

      setLocalModules(prev => 
        prev.map(mod => mod.id === selectedModuleId ? { ...mod, completionRate: newRate } : mod)
      );
    }
  };

  const getActiveModule = () => {
    return localModules.find(m => m.id === selectedModuleId);
  };

  const getActiveLesson = () => {
    return moduleLessons.find(l => l.id === activeLessonId);
  };

  // Filter modules
  const filtered = localModules.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    const completion = m.completionRate || 0;
    if (filter === 'inprogress') return matchSearch && completion > 0 && completion < 100;
    if (filter === 'completed')  return matchSearch && completion === 100;
    return matchSearch;
  });

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    return `${h}h ${Math.floor((sec % 3600) / 60)}m`;
  };

  // Sub-component: Lesson List/Sidebar
  const renderLessonsSidebar = (compact = false) => {
    return (
      <div className={`flex flex-col gap-3 ${compact ? '' : 'w-full lg:w-80'}`}>
        <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
          Lessons Outline
        </h4>
        <div className="flex flex-col gap-2">
          {moduleLessons.map((les, index) => {
            const isActive = les.id === activeLessonId;
            return (
              <button
                key={les.id}
                onClick={() => setActiveLessonId(les.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                  isActive 
                    ? 'bg-[var(--brand-sub)] border-[var(--brand-border)] shadow-sm'
                    : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-2)] border-[var(--border)]'
                }`}
              >
                <div className="mt-0.5">
                  {les.isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center text-[var(--success)]">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-semibold ${
                      isActive ? 'border-[var(--brand)] text-[var(--brand)]' : 'border-[var(--text-muted)] text-[var(--text-secondary)]'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-[var(--brand)]' : 'text-[var(--text-primary)]'}`}>
                    {les.title.replace(/^\d+\.\s*/, '')}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-indigo text-[9px] px-1 py-0 uppercase">
                      {les.contentType}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] flex items-center gap-0.5">
                      <Clock size={9}/> {Math.floor(les.durationSec / 60)}m
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Sub-component: Lesson Content Player Area
  const renderLessonPlayer = () => {
    const lesson = getActiveLesson();
    if (!lesson) return null;

    return (
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* Lesson Navigation Header */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--brand-sub)] rounded-lg text-[var(--brand)]">
              {lesson.contentType === 'video' && <Play size={16} />}
              {lesson.contentType === 'text' && <FileText size={16} />}
              {lesson.contentType === 'code' && <Code size={16} />}
              {lesson.contentType === 'quiz' && <HelpCircle size={16} />}
              {lesson.contentType === 'assignment' && <Send size={16} />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {lesson.title}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-none">
                Est. Duration: {Math.floor(lesson.durationSec / 60)} minutes
              </p>
            </div>
          </div>

          {lesson.isCompleted ? (
            <div className="flex items-center gap-1 text-[var(--success)] font-semibold text-xs bg-[var(--success-bg)] px-3 py-1.5 rounded border border-[var(--success-border)]">
              <CheckCircle size={13}/> Completed
            </div>
          ) : (
            <button
              onClick={() => markLessonComplete(lesson.id)}
              className="btn btn-primary btn-sm text-[11px] gap-1 px-3 py-1.5 shadow"
            >
              Mark Complete <Check size={12}/>
            </button>
          )}
        </div>

        {/* Content Viewer Panel */}
        <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg min-h-[450px] flex flex-col">
          
          {/* SIMULATOR: VIDEO */}
          {lesson.contentType === 'video' && (
            <div className="flex-1 flex flex-col bg-black relative group">
              <div 
                className="flex-1 flex items-center justify-center bg-cover bg-center opacity-75"
                style={{ backgroundImage: `url(${lesson.videoThumbnail})` }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <button className="w-16 h-16 rounded-full bg-[var(--brand)]/90 hover:bg-[var(--brand)] hover:scale-105 transition-all text-white flex items-center justify-center shadow-2xl relative z-10 cursor-pointer">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </button>
              </div>
              
              {/* Custom styled mock media overlay player */}
              <div className="p-4 bg-[var(--bg-card-2)] border-t border-[var(--border)] flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono text-[var(--brand)]">0:00</div>
                  <div className="flex-1 h-1 bg-[var(--border-strong)] rounded relative cursor-pointer">
                    <div className="absolute top-0 left-0 w-[30%] h-full bg-[var(--brand)] rounded" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)]">{lesson.videoDurationText || '10:00'}</div>
                </div>
                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <div className="flex items-center gap-4">
                    <Play size={14} className="hover:text-[var(--text-primary)] cursor-pointer" fill="currentColor"/>
                    <Volume2 size={14} className="hover:text-[var(--text-primary)] cursor-pointer" />
                  </div>
                  <div className="text-xs italic text-[var(--text-muted)]">CII Video System</div>
                  <Maximize2 size={14} className="hover:text-[var(--text-primary)] cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR: TEXT READING */}
          {lesson.contentType === 'text' && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-[var(--text-primary)] select-text max-h-[550px]">
              <div 
                className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: lesson.textBody
                    ? lesson.textBody
                        .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[var(--brand)] mt-4 mb-2">$1</h3>')
                        .replace(/^#### (.*$)/gim, '<h4 class="text-sm font-bold text-[var(--text-primary)] mt-3 mb-1.5">$1</h4>')
                        .replace(/^> \[\!NOTE\]\n> (.*$)/gim, '<div class="alert alert-info my-4"><p class="text-xs leading-relaxed">$1</p></div>')
                        .replace(/^> \[\!TIP\]\n> (.*$)/gim, '<div class="alert alert-success my-4"><p class="text-xs leading-relaxed">$1</p></div>')
                        .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc mt-1">$1</li>')
                        .replace(/> (.*$)/gim, '<blockquote class="border-l-2 border-[var(--brand)] pl-3 italic text-[var(--text-secondary)]">$1</blockquote>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic text-[var(--text-secondary)]">$1</em>')
                    : 'No details available.'
                }}
              />
            </div>
          )}

          {/* SIMULATOR: INTERACTIVE QUIZ */}
          {lesson.contentType === 'quiz' && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 max-h-[550px]">
              <div className="flex flex-col gap-1.5 pb-4 border-b border-[var(--border)]">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">Lesson Assessment Quiz</h4>
                <p className="text-xs text-[var(--text-secondary)]">Answer all questions to complete the lesson. You need 100% correct answers to pass.</p>
              </div>

              {lesson.quizQuestions?.map((q, qIndex) => {
                const answer = quizAnswers[q.id];
                const showExplanation = quizSubmitted;
                const isCorrect = answer === q.correctAnswer;

                return (
                  <div key={q.id} className="flex flex-col gap-3.5 p-4 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border)]">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Q{qIndex + 1}: {q.question}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1.5">
                      {q.options.map((opt) => {
                        const isSelected = answer === opt;
                        let optionStyle = "border-[var(--border)] hover:bg-[var(--bg-hover)]";
                        if (isSelected) optionStyle = "bg-[var(--brand-sub)] border-[var(--brand)] text-[var(--brand)]";
                        
                        if (showExplanation) {
                          if (opt === q.correctAnswer) {
                            optionStyle = "bg-[var(--success-bg)] border-[var(--success)] text-[var(--success)] font-semibold";
                          } else if (isSelected && !isCorrect) {
                            optionStyle = "bg-[var(--error-bg)] border-[var(--error)] text-[var(--error)]";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt }))}
                            className={`w-full text-left p-3 rounded text-xs border transition-all cursor-pointer ${optionStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <div className={`text-[11px] p-3 rounded mt-2 border leading-relaxed ${
                        isCorrect ? 'bg-[var(--success-bg)] border-[var(--success-border)] text-[var(--success)]' : 'bg-[var(--error-bg)] border-[var(--error-border)] text-[var(--error)]'
                      }`}>
                        <div className="font-bold uppercase tracking-wider mb-0.5">{isCorrect ? '✓ Correct' : '✗ Incorrect'}</div>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length !== (lesson.quizQuestions?.length || 0)}
                  onClick={() => {
                    setQuizSubmitted(true);
                    // Check if all answers are correct
                    const allCorrect = lesson.quizQuestions?.every(q => quizAnswers[q.id] === q.correctAnswer);
                    if (allCorrect) {
                      markLessonComplete(lesson.id);
                    }
                  }}
                  className="btn btn-primary w-full md:w-auto md:ml-auto gap-1 mt-4 cursor-pointer"
                >
                  Submit Quiz Answers <Send size={12} />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[var(--brand-sub)] border border-[var(--brand-border)] mt-4">
                  <div className="text-xs text-[var(--text-primary)]">
                    {lesson.quizQuestions?.every(q => quizAnswers[q.id] === q.correctAnswer) ? (
                      <span className="text-[var(--success)] font-bold">🎉 Congratulations! You answered all questions correctly and unlocked this lesson.</span>
                    ) : (
                      <span className="text-[var(--error)] font-bold">Some questions were answered incorrectly. Try again to pass the lesson!</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="btn btn-secondary btn-sm gap-1 cursor-pointer text-xs"
                  >
                    Reset Quiz <RotateCcw size={12} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SIMULATOR: INTERACTIVE CODE EXECUTION */}
          {lesson.contentType === 'code' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[450px]">
              {/* Simulated code editor */}
              <div className="flex-1 flex flex-col bg-[#1A1A1A] border-r border-[var(--border)] overflow-hidden">
                <div className="px-4 py-2 border-b border-[var(--border-muted)] bg-[#121212] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                    main.{lesson.codeLanguage || 'py'} (Python Sandbox)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--error)]/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)]/70"></span>
                  </div>
                </div>
                
                <div className="flex-1 p-4 font-mono text-xs md:text-sm text-neutral-300 leading-relaxed overflow-y-auto max-h-[350px]">
                  <pre>{lesson.codeSnippet}</pre>
                </div>

                <div className="p-4 border-t border-[var(--border-muted)] bg-[#121212] flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">Python v3.11 Interpreter</span>
                  <button
                    onClick={() => {
                      setCodeRunning(true);
                      setTimeout(() => {
                        setCodeRunning(false);
                        setCodeRunDone(true);
                        markLessonComplete(lesson.id);
                      }, 1500);
                    }}
                    className="btn btn-primary btn-sm text-[11px] gap-1 cursor-pointer"
                  >
                    <Terminal size={12}/> Run Python Script
                  </button>
                </div>
              </div>

              {/* Simulated Console Output */}
              <div className="w-full md:w-64 bg-[#0F0F0F] flex flex-col overflow-hidden">
                <div className="px-4 py-2 border-b border-[var(--border-muted)] bg-[#121212] text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                  Terminal Console
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-green-400 bg-black leading-normal select-text overflow-y-auto">
                  {codeRunning ? (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <div className="w-2.5 h-2.5 rounded-full border border-yellow-400 border-t-transparent animate-spin"></div>
                      Executing script...
                    </div>
                  ) : codeRunDone ? (
                    <div className="flex flex-col gap-2">
                      <div className="text-[var(--text-muted)] font-mono">[Process started]</div>
                      <pre className="whitespace-pre-wrap">{lesson.codeOutput}</pre>
                      <div className="text-[var(--text-muted)] mt-2 font-mono">[Process completed successfully]</div>
                      <div className="text-[var(--success)] font-bold text-[10px] mt-1">✓ Lesson unlocked & complete!</div>
                    </div>
                  ) : (
                    <div className="text-[var(--text-muted)]">Click "Run Python Script" to execute code.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR: ASSIGNMENT SUBMISSION */}
          {lesson.contentType === 'assignment' && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 max-h-[550px]">
              <div className="flex flex-col gap-1.5 pb-4 border-b border-[var(--border)]">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">Module Final Assignment</h4>
                <p className="text-xs text-[var(--text-secondary)]">Complete and upload your assignment details to get a graded analysis from your mentor.</p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border)] flex flex-col gap-3">
                <div className="text-xs font-bold text-[var(--brand)]">Prompt Guidelines:</div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[var(--text-secondary)] leading-relaxed bg-[#1A1A1A] p-4 rounded border border-[var(--border-muted)]">
                  {lesson.assignmentPrompt}
                </pre>
              </div>

              {!assignmentSubmitted ? (
                <div className="flex flex-col gap-4">
                  {/* File Dropzone Mock */}
                  <div className="border-2 border-dashed border-[var(--border-strong)] rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-[var(--bg-card-2)]/40 hover:bg-[var(--bg-card-2)]/80 hover:border-[var(--brand)] transition-all cursor-pointer"
                    onClick={() => setUploadedFileName("RGU_AI_Ethics_Essay_Sharma_R.pdf")}>
                    <Upload size={28} className="text-[var(--text-muted)]" />
                    <div className="text-center">
                      <div className="text-xs font-bold text-[var(--text-primary)]">
                        {uploadedFileName ? (
                          <span className="text-[var(--brand)] flex items-center gap-1.5 justify-center">
                            <File size={14}/> {uploadedFileName}
                          </span>
                        ) : (
                          "Click to browse / Upload PDF or Document"
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">Maximum file size: 5MB</p>
                    </div>
                  </div>

                  <button
                    disabled={!uploadedFileName}
                    onClick={() => {
                      setAssignmentSubmitted(true);
                      markLessonComplete(lesson.id);
                      
                      // Simulate automated Grading after 2s
                      setTimeout(() => {
                        setAssignmentGrade({
                          grade: 'A (94/100)',
                          feedback: 'Excellent work, Riya! Your guidelines on balancing generative AI features with structural drafting are extremely pragmatic. The ethical considerations are well outlined.'
                        });
                      }, 2000);
                    }}
                    className="btn btn-primary w-full md:w-auto md:ml-auto gap-1 cursor-pointer"
                  >
                    Submit Assignment <Send size={12}/>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-lg bg-[var(--success-bg)] border border-[var(--success-border)] flex flex-col gap-2">
                    <div className="text-xs font-bold text-[var(--success)] flex items-center gap-1.5">
                      <CheckCircle size={14}/> Assignment Submitted Successfully!
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Your document has been sent to the Centre for Innovation and Incubation evaluations team.
                    </p>
                  </div>

                  {/* Dynamic Grading Report */}
                  <div className="p-4 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border)] flex flex-col gap-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-muted)]">
                      <span className="text-xs font-bold text-[var(--text-primary)]">Mentor Assessment Report</span>
                      {assignmentGrade ? (
                        <span className="badge badge-green font-bold text-xs px-2 py-0.5">{assignmentGrade.grade}</span>
                      ) : (
                        <span className="flex items-center gap-2 text-yellow-400 text-xs font-bold">
                          <div className="w-2.5 h-2.5 rounded-full border border-yellow-400 border-t-transparent animate-spin"></div>
                          Evaluating Submission...
                        </span>
                      )}
                    </div>
                    
                    {assignmentGrade ? (
                      <div className="flex flex-col gap-2">
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">Assessed by: Prof. R. Anjit Raja</div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {assignmentGrade.feedback}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[var(--text-muted)] italic">
                        Mentor is reviewing your PDF file. The grade and detailed rubric feedback will appear here within a few seconds.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    );
  };

  // Sub-component: Module Overview/Detail View
  const renderModuleDetailView = () => {
    const mod = getActiveModule();
    if (!mod) return null;

    const completion = mod.completionRate || 0;

    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModuleId(null)}
              className="btn btn-secondary btn-icon text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
                  {mod.title}
                </h2>
                <span className="badge badge-indigo text-[10px]">Year {mod.yearLevel}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                {moduleLessons.length} lessons outline · Total duration: {formatDuration(mod.totalDuration)}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedModuleId(null)}
            className="btn btn-secondary btn-sm gap-1 hover:text-[var(--text-primary)] text-xs cursor-pointer"
          >
            All Modules
          </button>
        </div>

        {/* Dynamic Inner Layout: Summary Overview or Active Lesson Player */}
        {!activeLessonId ? (
          /* MODULE OVERVIEW SCREEN */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle: Module details & outline */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="text-4xl">{MODULE_EMOJIS[mod.orderNo - 1] || '📚'}</div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">Module Details & Objectives</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{mod.description}</p>
                  </div>
                </div>

                <div className="divider my-2" />

                {/* Progress Card Section */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 text-[var(--text-secondary)]">
                    <span>Overall Module Completion</span>
                    <span className="font-semibold text-[var(--brand)]">{completion}%</span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: `${completion}%` }} />
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                    Unlocking a module certificate requires complete completion of all lessons, quizzes, and final assignments.
                  </p>
                </div>

                <div className="flex gap-4.5 mt-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-card-2)] px-3 py-1.5 rounded border border-[var(--border)]">
                    <BookOpen size={13} className="text-[var(--brand)]"/>
                    <strong>{moduleLessons.length}</strong> Lessons
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-card-2)] px-3 py-1.5 rounded border border-[var(--border)]">
                    <Clock size={13} className="text-[var(--brand)]"/>
                    <strong>{formatDuration(mod.totalDuration)}</strong> Total
                  </div>
                </div>
              </div>

              {/* Lesson outlines overview */}
              <div className="card p-6 flex flex-col gap-4">
                <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">What you will learn in this module</h4>
                
                <div className="flex flex-col gap-3">
                  {moduleLessons.map((les, index) => (
                    <div key={les.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-card-2)] transition-all">
                      <div className="mt-0.5">
                        {les.isCompleted ? (
                          <div className="w-4.5 h-4.5 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center text-[var(--success)]">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-4.5 h-4.5 rounded-full border border-[var(--text-muted)] flex items-center justify-center text-[10px] font-semibold text-[var(--text-secondary)]">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[var(--text-primary)]">{les.title.replace(/^\d+\.\s*/, '')}</div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-0.5 line-clamp-1">{les.description}</p>
                      </div>
                      <span className="badge badge-indigo text-[9px] px-1 py-0 uppercase self-center">{les.contentType}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Quick Action Outline */}
            <div className="flex flex-col gap-5">
              <div className="card p-6 flex flex-col gap-5 bg-gradient-to-br from-[var(--brand-sub)] to-transparent border-[var(--brand-border)]">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[var(--brand)]">Ready to begin your training?</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Click the button below to resume or start the lessons from the beginning.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    // Start first uncompleted lesson, or just first lesson
                    const firstUncompleted = moduleLessons.find(l => !l.isCompleted);
                    if (firstUncompleted) {
                      setActiveLessonId(firstUncompleted.id);
                    } else if (moduleLessons.length > 0) {
                      setActiveLessonId(moduleLessons[0].id);
                    }
                  }}
                  className="btn btn-primary w-full gap-1 py-2.5 font-bold cursor-pointer"
                >
                  Start Training <ChevronRight size={14} />
                </button>
              </div>

              {renderLessonsSidebar(true)}
            </div>

          </div>
        ) : (
          /* ACTIVE LESSON VIEW WITH SPLIT PLAYER & SIDEBAR */
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {renderLessonPlayer()}
            {renderLessonsSidebar(false)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-content animate-fadeIn">
      <AnimatePresence mode="wait">
        {!selectedModuleId ? (
          /* STANDARD GRID VIEW OF MODULES */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
                  Learning Modules
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {localModules.length} modules · {localModules.reduce((a, m) => a + m.totalLessons, 0)} total lessons
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-auto">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
                  <input 
                    className="input text-sm w-full sm:w-56" 
                    style={{ paddingLeft: 32 }}
                    placeholder="Search modules..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                  />
                </div>
                {/* Filter */}
                <div className="tab-list w-full sm:w-auto justify-between" style={{ padding: 2 }}>
                  {[['all', 'All'], ['inprogress', 'In Progress'], ['completed', 'Completed']].map(([v, l]) => (
                    <button 
                      key={v} 
                      onClick={() => setFilter(v as any)}
                      className="tab-trigger" 
                      data-state={filter === v ? 'active' : 'inactive'}
                      style={{ fontSize: 11, padding: '5px 10px' }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modules grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((mod, i) => {
                const completion = mod.completionRate || 0;
                const isLocked = mod.yearLevel > 1 && completion === 0 && mod.orderNo > 3;
                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    onClick={() => handleCardClick(mod.id)}
                    className="module-card group"
                  >
                    {/* Card top — Subtle Fluent Blue Header */}
                    <div 
                      className="relative p-5 pb-4"
                      style={{ background: 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{MODULE_EMOJIS[mod.orderNo - 1] || '📚'}</div>
                        <div className="flex items-center gap-1.5">
                          {completion === 100 && <span className="badge badge-green" style={{ fontSize: 9 }}><CheckCircle size={9}/> Done</span>}
                          {completion > 0 && completion < 100 && <span className="badge badge-amber" style={{ fontSize: 9 }}><Play size={9}/> In Progress</span>}
                          {isLocked && <span className="badge badge-red" style={{ fontSize: 9 }}><Lock size={9}/> Locked</span>}
                          <span className="badge badge-indigo" style={{ fontSize: 9 }}>Year {mod.yearLevel}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold leading-snug mb-1 text-[var(--text-primary)]">
                        {mod.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2 mt-1">{mod.description}</p>
                    </div>

                    {/* Progress */}
                    <div className="px-5 py-3 border-t border-b border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                      <div className="flex justify-between text-xs mb-1.5 text-[var(--text-secondary)]">
                        <span>Progress</span>
                        <span className="font-semibold text-[var(--brand)]">{completion}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }} 
                          animate={{ width: `${completion}%` }}
                          transition={{ duration: 0.6, delay: i * 0.04 + 0.1 }} 
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1"><BookOpen size={11}/> {mod.totalLessons} lessons</span>
                        <span className="flex items-center gap-1"><Clock size={11}/> {formatDuration(mod.totalDuration)}</span>
                      </div>
                      <button 
                        className="btn btn-primary btn-sm gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ fontSize: 11, padding: '4px 10px' }}
                      >
                        {completion > 0 ? 'Continue' : 'Start'} <ChevronRight size={12} />
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                      {mod.tags.map(tag => (
                        <span key={tag} className={`badge ${TAG_COLORS[tag] || 'badge-indigo'}`} style={{ fontSize: 9 }}>
                          <Tag size={8}/> {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
                <BookOpen size={36} className="mb-3 opacity-40 text-[var(--text-muted)]" />
                <div className="text-sm">No modules match your search.</div>
              </div>
            )}
          </motion.div>
        ) : (
          /* MODULE DETAILED SUB-PAGE VIEW */
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderModuleDetailView()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
