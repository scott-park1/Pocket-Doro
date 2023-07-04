import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Clouds from './Clouds'

function Home() {
  const [showClouds, setShowClouds] = useState(true)
  const handleStartClick = () => {
    setShowClouds(false)
  }

  return (
    <>
      <div className="repostion">{showClouds && <Clouds />}</div>
      <div>
        <h1 className="title">POCKET DORO</h1>
        <Link to="/start" className="startlink" onClick={handleStartClick}>
          START
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default Home
