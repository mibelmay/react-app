import React, {useState} from 'react';
import styled, {css} from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useCheckTodoItem, useDeleteTodoItem} from '../../data/hooks/useData';
import {Priority} from './Priority';

const checkedCss = css`
  color: #696969;
  text-decoration: line-through;
`
const Title = styled.span(props => {
  return `
    width: 50%;
    font-size: 15px;
    overflow-wrap: break-word; 
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  min-width: 13px;
  min-height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({id, title, checked, itemPriority}) => {
  const {mutate: deleteMutate} = useDeleteTodoItem();
  const { mutate: checkMutate } = useCheckTodoItem();
  
  const [priority, setCurrentPriority] = useState(itemPriority);

  
  
  const handleDelete = () => {
    const confirm = window.confirm('Удалить задачу?')
    if (confirm) {
      deleteMutate({id});
    }
  };

  const handleCheck = () => {
    checkMutate({id: id, checked: !checked});
  };

  const handlePriorityChange = (newPriority) => {
    setCurrentPriority(newPriority);
  };

  
  return (
    <TodoItemContainer priority={priority}>
      <TodoItemCheckbox checked={checked} onCheck={handleCheck}/>
      <Title checked={checked}>
        {title}
      </Title>
      <Priority id={id} priority={priority} setPriority={handlePriorityChange} />
      <Delete onClick={handleDelete}/>
    </TodoItemContainer>
  )
}