import { Outlet } from 'react-router-dom'
import Login from './Login'

function App() {
  return (
    <>
      <Login />
      <section className="main">
        <Outlet />
      </section>
      <div className="workinprogress"></div>
    </>
  )
}

export default App
