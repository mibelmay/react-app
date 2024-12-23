import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import styled from 'styled-components';
import {priorityOptions} from '../TodoItem/Priority';


const SortButton = styled.button`
  background-color: #9c9c9c;
  color: black;
  align-self: center;
  width: 50%;
  border-radius: 20px 20px;
  border: none;
  padding: 5px 5px;
  cursor: pointer;
`;


export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');  //
  const [sortAscending, setSortAscending] = useState(true);
  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  };

  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = normalizeString(todoItem.title);
    const clearedSearchValue = normalizeString(searchValue);
    const isSearched = clearedTodoItemTitle.includes(clearedSearchValue);
    return searchValue.length >= 3 ? isSearched : true;
  });

  const sortedItems = [...filteredBySearchItems].sort((a, b) => {
    const priorityOrder = { 'сложно': 3, 'средне': 2, 'легко': 1};
    return sortAscending
      ? priorityOrder[a.priority] - priorityOrder[b.priority]
      : priorityOrder[b.priority] - priorityOrder[a.priority];
  });


  const todoItemsElements = sortedItems.map((item) => (
    <TodoItem
      key={item.id}
      title={item.title}
      checked={item.isDone}
      id={item.id}
      itemPriority={item.priority}
    />
  ));

  const handleSortChange = () => {
    setSortAscending(!sortAscending);
  };

return (
  <TodoItemsContainer>
    <SearchInput value={searchValue} setValue={setSearchValue} />
    <SortButton onClick={handleSortChange}>
      {sortAscending ? 'сначала легче' : 'сначала сложнее'}
    </SortButton>
    {todoItemsElements}
    <NewTodoItem />
  </TodoItemsContainer>

);
};