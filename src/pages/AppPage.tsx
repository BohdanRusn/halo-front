import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { AppDispatch } from '../store';
import { removeFriendRequest } from '../store/friends/friendsSlice';
import { SocketContext } from '../utils/context/SocketContext';
import { useToast } from '../utils/hooks/useToast';
import { LayoutPage } from '../utils/styles';
import {
  AcceptFriendRequestResponse,
  FriendRequest,
} from '../utils/types';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { fetchFriendRequestThunk } from '../store/friends/friendsThunk';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from '../utils/themes';
import Peer from 'peerjs';
import { AuthContext } from '../utils/context/AuthContext';
import { useFriendRequestReceived } from '../utils/hooks/sockets/friend-requests/useFriendRequestReceived';

export const AppPage = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { info } = useToast({ theme: 'dark' });
  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    new Peer(user.peer.id, {
      config: {
        iceServers: [
          {
            url: 'stun:stun.l.google.com:19302',
          },
          {
            url: 'stun:stun1.l.google.com:19302',
          },
        ],
      },
    });
  }, []);

  useFriendRequestReceived();

  useEffect(() => {
    socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
      dispatch(removeFriendRequest(payload));
    });
    socket.on(
      'onFriendRequestAccepted',
      (payload: AcceptFriendRequestResponse) => {
        dispatch(removeFriendRequest(payload.friendRequest));
        socket.emit('getOnlineFriends');
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`,
          {
            position: 'bottom-left',
            icon: BsFillPersonCheckFill,
            onClick: () => navigate('/friends'),
          }
        );
      }
    );

    socket.on('onFriendRequestRejected', (payload: FriendRequest) => {
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.off('onFriendRequestCancelled');
      socket.off('onFriendRequestRejected');
      socket.off('onFriendRequestReceived');
      socket.off('onFriendRequestAccepted');
    };
  }, [socket]);

  return (
    <ThemeProvider
      theme={ DarkTheme }
    >
      <LayoutPage>
        <UserSidebar />
        <Outlet />
      </LayoutPage>
    </ThemeProvider>
  );
};
