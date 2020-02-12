import React, { useState } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks";

import { TaskItem } from './TaskItem';
import { AccountsUIWrapper } from './AccountsUIWrapper';

interface IApp {
  tasks: task[]
  incompleteCount: number
}

export interface task {
  _id: string
  text: string
  checked: boolean
  createdAt?: Date
}

export const App: React.FC<IApp> = ({ tasks, incompleteCount }) => {
  const [inputTask, setInputTask] = useState<string>('')
  const [hideCompleted, setHideCompleted] = useState<boolean>(false)

  return (
    <div className="container">
      <header>
        <h1>Todo List { incompleteCount }</h1>

        <label className="hide-completed">
          <input type="checkbox"
            readOnly
            checked={ hideCompleted }
            onClick={ () => setHideCompleted(prev => !prev) }
          />
        </label>

        <AccountsUIWrapper />

        <form className="new-task" onSubmit={ handleSubmit }>
          <input
            type="text"
            onChange={ handleChange }
            value={ inputTask }
            placeholder="Type to add new task" />

        </form>
      </header>
      <ul>
        {
          (hideCompleted
            ? tasks.filter(({ checked }) => !checked)
            : tasks
          ).map(({ _id, text, checked }) => {
            return <TaskItem key={ _id } text={ text } checked={ checked } _id={ _id } />
          })
        }
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
      checked: false,
      createdAt: new Date()
    })

    setInputTask(() => '')
  }
}

export const TrackedApp = withTracker(() => ({
  tasks: Tasks.find({} as any, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
}))(App)