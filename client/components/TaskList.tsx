import { getUser } from '../apis/task'

import { useQuery } from '@tanstack/react-query'

export default function TaskList() {
  const { data: tasks, isError, isLoading } = useQuery(['tasks'], getUser)

  console.log('tasklist', tasks)
  if (isError) {
    return <div>There was an error trying to get the tasks ...</div>
  }

  if (isLoading) {
    return <div>Loading your tasks ...</div>
  }

  return (
    <>
      <h3>Task List</h3>
      <div>
        {tasks.map((task) => (
          <>
            <p key={task.id}>{task.task}</p>
            {/* <MovieDelete id={movie.id} /> */}
          </>
        ))}
      </div>
    </>
  )
}
