import {
  ArrowCycle,
  ChatDots,
  Person,
  Gear,
} from 'akar-icons';
import {
  Game,
  FriendRequest,
  FriendRequestDetailsType,
  User,
  UserSidebarRouteType,
} from './types';

export const getRecipientFromGame = (
  game?: Game,
  user?: User
) => {
  return user?.id === game?.creator.id
    ? game?.recipient
    : game?.creator;
};


export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'games':
      return ChatDots;
    case 'friends':
      return Person;
    default:
      return ChatDots;
  }
};

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User
): FriendRequestDetailsType =>
  user?.id === receiver.id
    ? {
        status: 'Incoming Friend Request',
        displayName: `${sender.firstName} ${sender.lastName}`,
        user: sender,
        incoming: true,
      }
    : {
        status: 'Outgoing Friend Request',
        displayName: `${receiver.firstName} ${receiver.lastName}`,
        user: receiver,
        incoming: false,
      };
