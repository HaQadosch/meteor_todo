import React from 'react';

import { Tasks } from "../api/tasks";
import { task } from "./App";

export const TaskItem: React.FC<task> = ({ _id, text, checked }) => {
  return (
    <li className={ checked ? 'checked' : '' }>
      <input type="checkbox"
        readOnly
        checked={ checked }
        onClick={ handleOnInputClick }
      />
      <span className="text">
        { text }
      </span>
      <button className="delete" onClick={ handleDelete }>&times;</button>
    </li>
  )

  function handleDelete (_: React.MouseEvent<HTMLButtonElement>) {
    Tasks.remove(_id)
  }

  function handleOnInputClick (_: React.MouseEvent<HTMLInputElement>) {
    Tasks.update(_id, {
      $set: { checked: !checked }
    })
  }
}
