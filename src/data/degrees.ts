// ============================================================
// CII AI Training Hub — Degree Programs Data (46 Degrees)
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================
import type { Degree } from '../types';

export const DEGREES: Degree[] = [
  // Arts & Commerce Stream
  { id: 'd01', code: 'BA_ENG', name: 'BA English', stream: 'Arts', durationYears: 3, aiLevel: 'Creative-AI', totalStudents: 45 },
  { id: 'd02', code: 'BBA_AVN', name: 'BBA Aviation', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 38 },
  { id: 'd03', code: 'BBA_LOG', name: 'BBA Logistics', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 42 },
  { id: 'd04', code: 'BCOM', name: 'B.Com', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 60 },
  { id: 'd05', code: 'BCOM_AF', name: 'BCOM A&F', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 55 },
  { id: 'd06', code: 'BCOM_ACCA', name: 'BCOM ACCA', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 30 },
  { id: 'd07', code: 'BCOM_BI', name: 'BCOM BI', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 35 },
  { id: 'd08', code: 'BCOM_BPS', name: 'BCOM BPS', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 28 },
  { id: 'd09', code: 'BCOM_CA', name: 'BCOM CA', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 40 },
  { id: 'd10', code: 'BCOM_CS', name: 'BCOM CS', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 38 },
  { id: 'd11', code: 'BCOM_FS', name: 'BCOM FS', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 32 },
  { id: 'd12', code: 'BCOM_IB', name: 'BCOM IB', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 29 },
  { id: 'd13', code: 'BCOM_IT', name: 'BCOM IT', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 36 },
  { id: 'd14', code: 'BCOM_ITAA', name: 'BCOM IT AA', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 34 },
  { id: 'd15', code: 'BCOM_PA', name: 'BCOM PA', stream: 'Commerce', durationYears: 3, aiLevel: 'Business-AI', totalStudents: 31 },
  // Science Aided
  { id: 'd16', code: 'BSC_AIDS_PRO', name: 'BSC AIDS — PRO', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 60 },
  { id: 'd17', code: 'BSC_CS_PRO', name: 'BSC CS — PRO', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 60 },
  { id: 'd18', code: 'BSC_CSCY_PRO', name: 'BSC CS CY — PRO', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 55 },
  { id: 'd19', code: 'BSC_ITDS_PRO', name: 'BSC IT DS — PRO', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 55 },
  // Science Self-Finance
  { id: 'd20', code: 'BCA_DEVOPS', name: 'BCA DevOps', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 50 },
  { id: 'd21', code: 'BSC_AIML', name: 'BSC AIML', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 60 },
  { id: 'd22', code: 'BSC_BIO', name: 'BSC Biotechnology', stream: 'Science', durationYears: 3, aiLevel: 'Applied-Science', totalStudents: 40 },
  { id: 'd23', code: 'BSC_CDF', name: 'BSC CDF', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 48 },
  { id: 'd24', code: 'BSC_CS', name: 'BSC CS', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 60 },
  { id: 'd25', code: 'BSC_CSAI', name: 'BSC CS AI', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 60 },
  { id: 'd26', code: 'BSC_CSDS', name: 'BSC CS DS', stream: 'Tech-Core', durationYears: 3, aiLevel: 'Advanced', totalStudents: 55 },
  { id: 'd27', code: 'BSC_CT', name: 'BSC CT BCDC', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 45 },
  { id: 'd28', code: 'BSC_DCFS', name: 'BSC DCFS', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 42 },
  { id: 'd29', code: 'BSC_DSA', name: 'BSC DSA', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 50 },
  { id: 'd30', code: 'BSC_IT', name: 'BSC IT', stream: 'Tech-Adjacent', durationYears: 3, aiLevel: 'Intermediate', totalStudents: 55 },
  { id: 'd31', code: 'BSC_MATHS', name: 'BSC Maths', stream: 'Science', durationYears: 3, aiLevel: 'Applied-Science', totalStudents: 45 },
  { id: 'd32', code: 'BSC_MICRO', name: 'BSC Microbiology', stream: 'Science', durationYears: 3, aiLevel: 'Applied-Science', totalStudents: 38 },
  { id: 'd33', code: 'BSC_PHY', name: 'BSC Physics', stream: 'Science', durationYears: 3, aiLevel: 'Applied-Science', totalStudents: 40 },
  { id: 'd34', code: 'BSC_PSY', name: 'BSC Psychology', stream: 'Arts', durationYears: 3, aiLevel: 'Creative-AI', totalStudents: 42 },
  { id: 'd35', code: 'BSC_VISCOM', name: 'BSC VISCOM', stream: 'Arts', durationYears: 3, aiLevel: 'Creative-AI', totalStudents: 35 },
  // Postgraduate
  { id: 'd36', code: 'MA_ENG', name: 'MA English', stream: 'Arts', durationYears: 2, aiLevel: 'Creative-AI', totalStudents: 25 },
  { id: 'd37', code: 'MCOM_CA', name: 'MCOM CA', stream: 'Tech-Adjacent', durationYears: 2, aiLevel: 'Intermediate', totalStudents: 28 },
  { id: 'd38', code: 'MSC_APPSY', name: 'MSC Applied Psychology', stream: 'Arts', durationYears: 2, aiLevel: 'Creative-AI', totalStudents: 22 },
  { id: 'd39', code: 'MSC_BIO', name: 'MSC Biotechnology', stream: 'Science', durationYears: 2, aiLevel: 'Applied-Science', totalStudents: 20 },
  { id: 'd40', code: 'MSC_CLNSY', name: 'MSC Clinical Psychology', stream: 'Arts', durationYears: 2, aiLevel: 'Creative-AI', totalStudents: 20 },
  { id: 'd41', code: 'MSC_CS', name: 'MSC CS', stream: 'Tech-Core', durationYears: 2, aiLevel: 'Advanced', totalStudents: 30 },
  { id: 'd42', code: 'MSC_DSBA', name: 'MSC DSBA', stream: 'Tech-Core', durationYears: 2, aiLevel: 'Advanced', totalStudents: 25 },
  { id: 'd43', code: 'MSC_IT', name: 'MSC IT', stream: 'Tech-Adjacent', durationYears: 2, aiLevel: 'Intermediate', totalStudents: 28 },
  { id: 'd44', code: 'MSC_MATHS', name: 'MSC Maths', stream: 'Science', durationYears: 2, aiLevel: 'Applied-Science', totalStudents: 22 },
  { id: 'd45', code: 'MSC_MICRO', name: 'MSC Microbiology', stream: 'Science', durationYears: 2, aiLevel: 'Applied-Science', totalStudents: 20 },
];

export const getDegreeById = (id: string) => DEGREES.find(d => d.id === id);
export const getDegreeByCode = (code: string) => DEGREES.find(d => d.code === code);
export const getDegreesByStream = (stream: string) => DEGREES.filter(d => d.stream === stream);

export const STREAM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Tech-Core':     { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  'Tech-Adjacent': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Science':       { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  'Commerce':      { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  'Arts':          { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export const AI_LEVEL_COLORS: Record<string, string> = {
  'Advanced':       '#2C5BDC',
  'Intermediate':   '#F5A623',
  'Applied-Science':'#22C55E',
  'Business-AI':    '#8B5CF6',
  'Creative-AI':    '#EC4899',
};
