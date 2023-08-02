export type CreateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type Profile = {
  id: number;
  about?: string;
  avatar?: string;
  banner?: string;
};

export type UserPresence = {
  id: number;
  statusMessage?: string;
  showOffline: boolean;
};

export type UserPeer = {
  id: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: Profile;
  presence?: UserPresence;
  peer: UserPeer;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  username: string;
  message: string;
};

export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
};

export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: Conversation;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

export type DeleteMessageParams = {
  id: number;
  messageId: number;
};

export type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

export type EditMessagePayload = {
  id: number;
  messageId: number;
  content: string;
};

export type Points = {
  x: number;
  y: number;
};

export type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

export type Friend = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
};

export type FriendRequest = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
  status: FriendRequestStatus;
};

export type HandleFriendRequestAction = 'accept' | 'reject' | 'cancel';

export type CancelFriendRequestResponse = {
  id: number;
};

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

export type UserSidebarRouteType =
  | 'conversations'
  | 'friends';

export type UserSidebarItemType = {
  id: UserSidebarRouteType;
  pathname: string;
};

export type FriendRequestDetailsType = {
  status: string;
  displayName: string;
  user: User;
  incoming: boolean;
};

export type SystemMessageLevel = 'info' | 'warning' | 'error';
export type SystemMessageType = {
  id: number;
  content: string;
  level: SystemMessageLevel;
};

export type UpdateStatusParams = {
  statusMessage: string;
};
