export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: string[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Desenvolvedores',
    path: '/developers',
    icon: 'people',
    roles: ['ADMIN'],
  },
  {
    label: 'Projetos',
    path: '/projects',
    icon: 'folder',
    roles: ['ADMIN'],
  },
  {
    label: 'Alocações',
    path: '/allocations',
    icon: 'assignment',
    roles: ['ADMIN'],
  },
];
