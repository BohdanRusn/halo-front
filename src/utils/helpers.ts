import {
  ArrowCycle,
  ChatDots,
  Person,
  Gear,
} from 'akar-icons';
import {
  Conversation,
  FriendRequest,
  FriendRequestDetailsType,
  User,
  UserSidebarRouteType,
} from './types';

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};


export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'conversations':
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
