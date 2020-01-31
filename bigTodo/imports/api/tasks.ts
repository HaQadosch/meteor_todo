import { Mongo } from "meteor/mongo";
import { task } from "../ui/App";

export const Tasks = new Mongo.Collection<task>('tasks')
