import React from 'react';
import { TaskItem } from './TaskItem';

interface IApp { }

interface task {
  _id: number
  text: string
}

const tasks: task[] = [
  { _id: 1, text: 'This is task 1' },
  { _id: 2, text: 'This is task 2' },
  { _id: 3, text: 'This is task 3' },
];

export const App: React.FC<IApp> = () => {
  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      <ul>
        { tasks.map(({ _id, text }) => {
          return <TaskItem key={ _id } text={ text } />
        }) }
      </ul>
    </div>
  )
}
