import { useState, useEffect } from 'react'

export default function Timer() {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [resting, setResting] = useState(false)
  const [skippedBreaks, setSkippedBreaks] = useState(0)
  const [completedCylces, setCompletedCycles] = useState(0)

  // !resting use minutes working
  // resting use resting minutes

  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval)

      // if number of cycles <= 2 short break.
      // if number of cycles > 2 long break, number of cycles = 0

      if (completedCylces <= 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            const minutes = resting ? 24 : 4
            const seconds = 59
            setSeconds(seconds)
            setMinutes(minutes)
            setResting(!resting)
            setCompletedCycles(completedCylces + 1)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }

      if (completedCylces > 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            const minutes = !resting ? 24 : 29
            const seconds = 59
            setSeconds(seconds)
            setMinutes(minutes)
            setResting(!resting)
            setCompletedCycles(0)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }
    }, 1000)
  }, [seconds])

  // if resting === true
  // skip break
  //// resting = false
  //// set num of breaks skipped
  //// timer goes to next work cycle

  async function skipBreak() {
    await setResting(false)
    setSkippedBreaks(skippedBreaks + 1)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
      {resting && (
        <>
          <div>Break time! New session starts in: </div>
          <button onClick={skipBreak}> skip break </button>
        </>
      )}
      <div>
        {timerMinutes}:{timerSeconds}
      </div>
      <div> Completed work cycles: {completedCylces}</div>
      <div> breaks skipped: {skippedBreaks}</div>
    </>
  )
}
