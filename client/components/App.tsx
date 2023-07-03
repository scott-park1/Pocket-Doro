import { Outlet } from 'react-router-dom'
import Emoticon from './Emoticon'

function App() {
  return (
    <>
      <section className="main">
        {/* <Timer skippedBreaks={skippedBreaks} onSkipBreak={onSkipBreak} /> */}
        <Outlet />
      </section>
      <div className="workinprogress">
        {/* <Emoticon skippedBreaks={3} resting={false} /> */}
      </div>
    </>
    // Don't really need the fragment, since the section is wrapping everything.
  )
}

export default App
