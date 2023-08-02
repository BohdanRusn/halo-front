import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessageItemContent } from '../../utils/styles';
import { MessageType } from '../../utils/types';
import { EditMessageContainer } from './EditMessageContainer';

type Props = {
  message: MessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding: string;
};

export const MessageItemContainerBody: React.FC<Props> = ({
  message,
  onEditMessageChange,
  padding,
}) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  return (
    <>
      {isEditingMessage && message.id === messageBeingEdited?.id ? (
        <MessageItemContent padding={padding}>
          <EditMessageContainer onEditMessageChange={onEditMessageChange} />
        </MessageItemContent>
      ) : (
        <MessageItemContent padding={padding}>
          {message.content || null}
        </MessageItemContent>
      )}
    </>
  );
};
