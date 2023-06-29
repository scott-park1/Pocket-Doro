import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Timer from './Timer'

function App() {
  return (
    <>
      <section className="main">
        <Timer />
        <Outlet />
      </section>

      <Footer />
    </>
  )
}

export default App
