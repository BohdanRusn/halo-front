import { useSelector } from 'react-redux';
import { selectType } from '../../store/selectedSlice';
import { MessagePanelConversationHeader } from './headers/MessagePanelConversationHeader';
import { MessagePanelGroupHeader } from './headers/MessagePanelGroupHeader';

export const MessagePanelHeader = () => {
  const type = useSelector(selectType);

    return type === 'private' ? (
      <MessagePanelConversationHeader />
    ) : (
      <MessagePanelGroupHeader />
    );
};
