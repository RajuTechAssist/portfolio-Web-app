export enum Tab {
  PROFILE = 'profile',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  EDUCATION = 'education'
}

export interface NavItem {
  id: Tab;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: Tab.PROFILE, label: 'Profile', icon: 'terminal' },
  { id: Tab.PROJECTS, label: 'Projects', icon: 'deployed_code' },
  { id: Tab.SKILLS, label: 'Skills', icon: 'memory' },
  { id: Tab.EXPERIENCE, label: 'XP', icon: 'history' },
  { id: Tab.EDUCATION, label: 'Edu', icon: 'school' },
];