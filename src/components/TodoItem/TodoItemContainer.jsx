import styled from 'styled-components';

const getBackgroundColor = (priority) => {
  switch (priority) {
    case 'сложно':
      return '#ebc2af';
    case 'средне':
      return '#fdeaa8';
    case 'легко':
      return '#d0f0c0';
    default:
      return 'white';
  }
};

const Root = styled.div `
  display: flex;
  gap: 9px;
  border-radius: 20px 20px;
  align-items: center;
  padding: 5px 5px;
  background-color: ${props => getBackgroundColor(props.priority)};
`

export const TodoItemContainer = ({children, priority}) => {
  return <Root priority={priority}>{children}</Root>
}