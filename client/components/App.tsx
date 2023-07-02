import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <section className="main">
        {/* <Timer skippedBreaks={skippedBreaks} onSkipBreak={onSkipBreak} /> */}
        <Outlet />
      </section>
    </>
  )
}

export default App
