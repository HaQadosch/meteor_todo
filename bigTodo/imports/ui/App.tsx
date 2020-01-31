import React from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks";

import { TaskItem } from './TaskItem';

interface IApp {
  tasks: task[]
}

export interface task {
  _id: number
  text: string
}

export const App: React.FC<IApp> = ({ tasks }) => {
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

export const TrackedApp = withTracker(() => ({
  tasks: Tasks.find({} as any).fetch()
}))(App)