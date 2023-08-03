import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {Button, SidebarContainerStyle} from '../../utils/styles';
import {
  SidebarHeader,
  SidebarStyle,
  ScrollableContainer,
} from '../../utils/styles';
import { GameSidebarItem } from '../games/GameSidebarItem';
import { CreateGameModal } from '../modals/CreateGameModal'

export const GameSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const games = useSelector(
    (state: RootState) => state.game.games
  );
  
  return (
    <>
      {showModal && (
        <CreateGameModal setShowModal={setShowModal} />
      )}
      <SidebarStyle>
        <SidebarHeader>
          <Button onClick={() => setShowModal(true)}>
            New Game
          </Button>
        </SidebarHeader>
        <ScrollableContainer>
          <SidebarContainerStyle>
            {games.map((game) => (
                  <GameSidebarItem
                    key={game.id}
                    game={game}
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
