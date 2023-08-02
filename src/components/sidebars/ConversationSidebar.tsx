import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {Button, SidebarContainerStyle} from '../../utils/styles';
import {
  SidebarHeader,
  SidebarStyle,
  ScrollableContainer,
} from '../../utils/styles';
import { ConversationSidebarItem } from '../conversations/ConversationSidebarItem';
import { ConversationTab } from '../conversations/ConversationTab';
import { CreateConversationModal } from '../modals/CreateConversationModal'

export const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  
  return (
    <>
      {showModal && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      <SidebarStyle>
        <SidebarHeader>
          <Button onClick={() => setShowModal(true)}>
            New Game
          </Button>
        </SidebarHeader>
        <ConversationTab />
        <ScrollableContainer>
          <SidebarContainerStyle>
            {conversations.map((conversation) => (
                  <ConversationSidebarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                )
              )}
          </SidebarContainerStyle>
        </ScrollableContainer>
        <footer></footer>
      </SidebarStyle>
    </>
  );
};
