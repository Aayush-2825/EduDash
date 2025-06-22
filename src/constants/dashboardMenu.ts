import {
  LayoutDashboard,
  TvMinimal,
  NotebookPen,
  ClipboardList,
  Settings,
  UserRoundPen,
  FilePlus2,
  BarChart3,
  UserCheck,
  Megaphone,
} from "lucide-react";

// --- Student Dashboard Menu ---
export const dashboardStudentMenu = [
  { name: 'Dashboard', url: '/student/dashboard', icon: LayoutDashboard },
  { name: 'Study Material', url: '/student/classes', icon: NotebookPen },
  { name: 'Tests', url: '/student/tests', icon: ClipboardList },
  { name: 'Profile', url: '/student/profile', icon: UserRoundPen }
];

// --- Teacher Dashboard Menu ---
export const dashboardTeacherMenu = [
  { name: 'Dashboard', url: '/teacher/dashboard', icon: LayoutDashboard },
  { name: 'Classes', url: '/teacher/classes', icon: NotebookPen },
  { name: 'Create Test', url: '/teacher/tests', icon: FilePlus2 },
  { name: 'Results', url: '/teacher/results', icon: BarChart3 },
  { name: 'Student Progress', url: '/teacher/students', icon: UserCheck },
  { name: 'Announcements', url: '/teacher/announcements', icon: Megaphone },
  { name: 'Profile', url: '/teacher/profile', icon: UserRoundPen }
];
