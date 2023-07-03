import { Link } from 'react-router-dom'
import Footer from './Footer'

function Home() {
  return (
    <>
      <div>
        <h1 className="title">POCKET DORO</h1>
        <Link to="/start" className="startlink">
          START
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default Home
