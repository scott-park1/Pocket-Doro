import { useState, useEffect } from 'react'

export default function Timer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(false)

  // use effect gives sideeffect to run when something happens (when we update our seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval)
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          const minutes = displayMessage ? 24 : 4
          const seconds = 59
          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMessage(!displayMessage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [seconds])

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
      {displayMessage && <div>Break time! New session starts in: </div>}
      <div>
        {timerMinutes}:{timerSeconds}
      </div>
    </>
  )
}
