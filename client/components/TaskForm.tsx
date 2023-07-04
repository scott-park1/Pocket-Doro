import { ChangeEvent, FormEvent, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addTask } from '../apis/task'
import { UserData } from '../../models/user'

const initialFormData: UserData = {
  task: '',
}

export default function TaskForm() {
  const [tasks, setTasks] = useState<UserData>(initialFormData)
  const queryClient = useQueryClient()

  const addTaskMutation = useMutation(addTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setTasks({ ...tasks, [name]: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTaskMutation.mutate(tasks)
    setTasks(initialFormData)
  }

  if (addTaskMutation.isError) {
    return <div>There was an error adding your task! </div>
  }

  if (addTaskMutation.isLoading) {
    return <div>Adding your task</div>
  }

  return (
    <>
      <h3>What do you want to work on? ✍🏼</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tasks">Task: </label>
          <input
            type="text"
            name="tasks"
            id="tasks"
            value={tasks.task}
            onChange={handleChange}
          />
          <button type="submit" className="submitbutton">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
