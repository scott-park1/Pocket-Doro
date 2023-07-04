import { getUser } from '../apis/task'
import TaskForm from './TaskForm'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TaskList() {
  const { data: tasks, isError, isLoading } = useQuery(['tasks'], getUser)
  const [currentTask, setCurrentTask] = useState('')

  if (isError) {
    return <div>There was an error trying to get the tasks ...</div>
  }

  if (isLoading) {
    return <div>Loading your tasks ...</div>
  }

  return (
    <>
      <h3>What you worked on previously: </h3>
      <div className="current-previous-task">
        {!currentTask
          ? tasks[tasks.length - 1].task
          : tasks[tasks.length - 2].task}
      </div>
      <h3>Task of the day:</h3>
      <div className="current-previous-task">{currentTask}</div>
      <TaskForm setCurrentTask={setCurrentTask} />
    </>
  )
}
