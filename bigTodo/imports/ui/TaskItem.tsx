import React from 'react';

interface ITaskItem {
  text: string;
}
export const TaskItem: React.FC<ITaskItem> = ({ text }) => {
  return <li>{ text }</li>;
};
