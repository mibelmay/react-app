import React from 'react';
import styled from 'styled-components';
import { usePriorityTodoItem } from '../../data/hooks/useData';

export const priorityOptions = [
  { value: '', label: '' },
  { value: 'сложно', label: 'сложно' },
  { value: 'средне', label: 'средне' },
  { value: 'легко', label: 'легко' },
];

const PrioritySelect = styled.select`
  margin-left: 10px;
  background-color: white;
  border: 1px solid #ccc;
`;

export const Priority = ({ id, priority, setPriority }) => {
  const { mutate } = usePriorityTodoItem();

  const onChangeHandler = (e) => {
    setPriority(e.target.value);
    mutate({id, priority: e.target.value});
  };

  return (
    <PrioritySelect value={priority} onChange={onChangeHandler}>
      {priorityOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PrioritySelect>
  );
};
