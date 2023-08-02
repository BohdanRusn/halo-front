import {
  ConversationTabItemStyle,
  ConversationTabStyle,
} from '../../utils/styles';
export const ConversationTab = () => {
  return (
    <ConversationTabStyle>
      <ConversationTabItemStyle selected>
        Private
      </ConversationTabItemStyle>
    </ConversationTabStyle>
  );
};
