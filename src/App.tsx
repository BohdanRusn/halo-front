import {Dispatch, PropsWithChildren, SetStateAction, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { GameChannelPage } from './pages/games/GameChannelPage';
import { GamePage } from './pages/games/GamePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthContext } from './utils/context/AuthContext';
import { socket, SocketContext } from './utils/context/SocketContext';
import { User } from './utils/types';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { enableMapSet } from 'immer';
import { AppPage } from './pages/AppPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GamePageGuard } from './guards/GamePageGuard';
import { FriendsLayoutPage } from './pages/friends/FriendsLayoutPage';
import { FriendRequestPage } from './pages/friends/FriendRequestPage';

enableMapSet();

type Props = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthenticatedRoute children={<AppPage />} />}>
          <Route path="games" element={<GamePage />}>
            <Route
              path=":id"
              element={
                <GamePageGuard children={<GameChannelPage />} />
              }
            />
          </Route>
          <Route path="friends" element={<FriendsLayoutPage />}>
            <Route path="requests" element={<FriendRequestPage />} />
            <Route path="blocked" element={<div>Blocked</div>} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
    </AppWithProviders>
  );
}

export default App;
