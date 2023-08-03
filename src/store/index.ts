import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import messageReducer from './messages/messageSlice';
import messageContainerReducer from './messageContainerSlice';
import friendsReducer from './friends/friendsSlice';
import systemMessageReducer from './system-messages/systemMessagesSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    messages: messageReducer,
    friends: friendsReducer,
    messageContainer: messageContainerReducer,
    systemMessages: systemMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
