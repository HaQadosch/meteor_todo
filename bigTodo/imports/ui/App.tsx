import React, { useState } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks";

import { TaskItem } from './TaskItem';

interface IApp {
  tasks: task[]
}

export interface task {
  _id: number
  text: string,
  createdAt: Date
}

export const App: React.FC<IApp> = ({ tasks }) => {
  const [inputTask, setInputTask] = useState<string>('')

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>

        <form className="new-task" onSubmit={ handleSubmit }>
          <input
            type="text"
            onChange={ handleChange }
            value={ inputTask }
            placeholder="Type to add new task" />

        </form>
      </header>
      <ul>
        { tasks.map(({ _id, text }) => {
          return <TaskItem key={ _id } text={ text } />
        }) }
      </ul>
    </div>
  )

  function handleChange ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
    setInputTask(() => value)
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    Tasks.insert({
      text: inputTask.trim(),
      createdAt: new Date()
    })

    setInputTask(() => '')
  }
}

export const TrackedApp = withTracker(() => ({
  tasks: Tasks.find({} as any, { sort: { createdAt: -1 } }).fetch()
}))(App)