import { useState, useEffect } from 'react'

export default function Timer() {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [resting, setResting] = useState(false)

  // state to hold working (boolean)
  //state to hold resting (boolean)

  const [completedCylces, setCompletedCycles] = useState(0)

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
            console.log(completedCylces + 'completed')
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
            const minutes = resting ? 24 : 29
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
    }, 10)
  }, [seconds])

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
      {resting && <div>Break time! New session starts in: </div>}
      <div>
        {timerMinutes}:{timerSeconds}
      </div>
      <div> Completed break cycles: {completedCylces}</div>
    </>
  )
}
