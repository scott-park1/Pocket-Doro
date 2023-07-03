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
  )
}

export default App
