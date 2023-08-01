import styled, { css } from 'styled-components';

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.messagePanel.inputContainer.color};
  font-family: 'Inter',serif;
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
  height: 20px;
  max-height: 200px;
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const FileInput = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;
