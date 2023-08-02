import { UserSidebarItemType } from './types';

export const friendsNavbarItems = [
  {
    id: 'friends',
    label: 'Friends',
    pathname: '/friends',
  },
  {
    id: 'requests',
    label: 'Requests',
    pathname: '/friends/requests',
  },
  {
    id: 'blocked',
    label: 'Blocked',
    pathname: '/friends/blocked',
  },
];

export const userSidebarItems: UserSidebarItemType[] = [
  {
    id: 'conversations',
    pathname: '/conversations',
  },
  {
    id: 'friends',
    pathname: '/friends',
  },
];