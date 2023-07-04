import { Link } from 'react-router-dom'
import Footer from './Footer'
import { IfAuthenticated } from './Authenticated'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const isAuth = true

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <>
      <div>
        <h1 className="title">POCKET DORO</h1>
        <IfAuthenticated>
          <Link to="/start" className="startlink">
            START
          </Link>
        </IfAuthenticated>
      </div>
      <Footer />
    </>
  )
}

export default Home
