import { AxiosError } from 'axios';
import React, { FC, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectGameById } from '../../store/gameSlice';
import {
  addSystemMessage,
  clearAllMessages,
} from '../../store/system-messages/systemMessagesSlice';
import { createMessage } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromGame } from '../../utils/helpers';
import { useToast } from '../../utils/hooks/useToast';
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatus,
} from '../../utils/styles';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import MazeGame from "../mazeGame/MazeGame";
import {MessagePanelGameHeader} from "./headers/MessagePanelGameHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};

export const MessagePanel: FC<Props> = ({
  sendTypingStatus,
  isRecipientTyping,
}) => {
  const toastId = 'rateLimitToast';
  const dispatch = useDispatch();
  const { messageCounter } = useSelector(
    (state: RootState) => state.systemMessages
  );
  const [content, setContent] = useState('');
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const { error } = useToast({ theme: 'dark' });
  const game = useSelector((state: RootState) =>
    selectGameById(state, parseInt(routeId!))
  );
  const recipient = getRecipientFromGame(game, user);

  useEffect(() => {
    return () => {
      dispatch(clearAllMessages());
    };
  }, []);

  const sendMessage = async () => {
    const trimmedContent = content.trim();
    if (!routeId) return;
    if (!trimmedContent) return;
    const formData = new FormData();
    formData.append('id', routeId);
    trimmedContent && formData.append('content', trimmedContent);
    try {
      await createMessage(routeId, formData);
      setContent('');
      dispatch(clearAllMessages());
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 429) {
        error('You are rate limited', { toastId });
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: 'error',
            content: 'You are being rate limited. Slow down.',
          })
        );
      } else if (axiosError.response?.status === 404) {
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: 'error',
            content:
              'The recipient is not in your friends list or they may have blocked you.',
          })
        );
      }
    }
  };

  return (
    <>
      <MessagePanelStyle>
        <MazeGame/>
        <MessagePanelGameHeader />
        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>
        <MessagePanelFooter>
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
            placeholderName={ recipient?.firstName || 'user' }
          />
          <MessageTypingStatus>
            {isRecipientTyping ? `${recipient?.firstName} is typing...` : ''}
          </MessageTypingStatus>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};
