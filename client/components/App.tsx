import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function App() {
  return (
    <>
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default App
