import React from 'react';
import styled from 'styled-components';
import { usePriorityTodoItem } from '../../data/hooks/useData';

export const priorityOptions = [
  { color: "#ffffff", value: '', label: '' },
  { color: "#ebc2af", value: 'сложно', label: 'сложно' },
  { color: "#fdeaa8", value: 'средне', label: 'средне' },
  { color: "#d0f0c0", value: 'легко', label: 'легко' },
];

const PrioritySelect = styled.select`
  margin-left: 10px;
  width: 25%;
  background-color: white;
  border: 1px solid #ccc;
  background-color: ${(props) => {
    const option = priorityOptions.find(opt => opt.value === props.value);
    return option ? option.color : 'white';
  }};
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
        <option key={option.value} value={option.value} style={{ backgroundColor: option.color }}></option>
      ))}
    </PrioritySelect>
  );
};
