import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import messageReducer from './messages/messageSlice';
import selectedTypeReducer from './selectedSlice';
import groupsReducer from './groupSlice';
import groupMessagesReducer from './groupMessageSlice';
import messageContainerReducer from './messageContainerSlice';
import groupSidebarReducer from './groupRecipientsSidebarSlice';
import friendsReducer from './friends/friendsSlice';
import rateLimitReducer from './rate-limit/rateLimitSlice';
import systemMessageReducer from './system-messages/systemMessagesSlice';
import settingsReducer from './settings/settingsSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    friends: friendsReducer,
    groups: groupsReducer,
    groupMessages: groupMessagesReducer,
    messageContainer: messageContainerReducer,
    groupSidebar: groupSidebarReducer,
    rateLimit: rateLimitReducer,
    systemMessages: systemMessageReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
