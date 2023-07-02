import { Link } from 'react-router-dom'
import Emoticon from './Emoticon'

function Home() {
  return (
    <div>
      <h1 className="title">POCKET-DORO</h1>
      <h2>TIME YOUR STUDY!</h2>
      <Link to="/start" className="startlink">
        START
      </Link>
      <Emoticon />
    </div>
  )
}

export default Home
