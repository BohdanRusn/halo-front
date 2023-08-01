import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { selectConversationById } from '../../../store/conversationSlice';
import { AuthContext } from '../../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../../utils/helpers';
import {
  MessagePanelHeaderIcons,
  MessagePanelHeaderStyle,
} from '../../../utils/styles';

export const MessagePanelConversationHeader = () => {
  const user = useContext(AuthContext).user!;
  const { id } = useParams();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);
  
  return (
    <MessagePanelHeaderStyle>
      <div>
        <span>{recipient?.username || 'User'}</span>
      </div>
      <MessagePanelHeaderIcons>
        {/*<FaPhoneAlt size={24} cursor="pointer" onClick={voiceCallUser} />*/}
        {/*<FaVideo size={30} cursor="pointer" onClick={videoCallUser} />*/}
      </MessagePanelHeaderIcons>
    </MessagePanelHeaderStyle>
  );
};
