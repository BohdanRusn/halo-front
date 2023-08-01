import {
  ContextMenuItemType,
  ConversationTypeData,
  SettingsItemType,
  UserSidebarItemType,
} from './types';

export const chatTypes: ConversationTypeData[] = [
  {
    type: 'private',
    label: 'Private',
  },
  {
    type: 'group',
    label: 'Group',
  },
];
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
  {
    id: 'settings',
    pathname: '/settings',
  },
];

export const settingsItems: SettingsItemType[] = [
  {
    id: 'profile',
    label: 'Profile',
    pathname: '/settings/profile',
  },
  {
    id: 'security',
    label: 'Security',
    pathname: '/settings/security',
  },

];
export enum CDN_URL {
  BASE = 'https://chuachat.ams3.cdn.digitaloceanspaces.com/',
}