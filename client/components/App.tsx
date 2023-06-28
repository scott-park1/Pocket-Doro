import Avatar from './Avatar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Avatar />
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App
