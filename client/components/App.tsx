import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Timer from './Timer'
import { useState } from 'react'
import Avatar from './Avatar'

function App() {
  const [skippedBreaks, setSkippedBreaks] = useState(0)

  function onSkipBreak() {
    setSkippedBreaks(skippedBreaks + 1)
    //change emoticon
  }

  return (
    <>
      <section className="main">
        <Timer skippedBreaks={skippedBreaks} onSkipBreak={onSkipBreak} />

        <Outlet />
      </section>

      <Footer />
    </>
  )
}

export default App
