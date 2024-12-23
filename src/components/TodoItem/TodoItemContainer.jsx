import styled from 'styled-components';

const Root = styled.div `
  display: flex;
  gap: 9px;
  border-radius: 20px 20px;
  align-items: center;
  padding: 5px 5px;
`

export const TodoItemContainer = ({children}) => {
  return <Root>{children}</Root>
}