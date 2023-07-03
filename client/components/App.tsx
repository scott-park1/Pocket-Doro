import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <section className="main">
        {/* <Timer skippedBreaks={skippedBreaks} onSkipBreak={onSkipBreak} /> */}
        <Outlet />
      </section>
    </>
    // Don't really need the fragment, since the section is wrapping everything.
  )
}

export default App
