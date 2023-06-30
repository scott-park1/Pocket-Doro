import { useState, useEffect } from 'react'

// const audioTune = new Audio('<YOUR_AUDIO_FILE_PATH.mp3>');

// // play audio sound
// const playSound = () => {
//   audioTune.play();
// }

interface Props {
  skippedBreaks: number
  onSkipBreak: () => void
}

export default function Timer({ skippedBreaks, onSkipBreak }: Props) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [resting, setResting] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // !resting use minutes working
  // resting use resting minutes

  const changeTimer = () => {
    setResting(!resting)

    if (resting) {
      setMinutes(24)
      setSeconds(59)
      return
    }

    if (completedCycles > 2) {
      setMinutes(29)
      setSeconds(59)
      return
    }

    setMinutes(4)
    setSeconds(59)
  }

  // useEffectEvent
  useEffect(() => {
    const interval = setInterval(() => {
      // if number of cycles <= 2 short break.
      // if number of cycles > 2 long break, number of cycles = 0
      if (isPaused) {
        return
      }

      if (completedCycles <= 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            changeTimer()
            setCompletedCycles(completedCycles + 1)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }

      if (completedCycles > 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            changeTimer()
            setCompletedCycles(0)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds, changeTimer, completedCycles, minutes])

  // if resting === true
  // skip break
  //// resting = false
  //// set num of breaks skipped
  //// timer goes to next work cycle

  function skipBreak() {
    changeTimer()
    onSkipBreak()
  }

  function pauseTimer() {
    setIsPaused(!isPaused)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
      {isPaused ? (
        <button onClick={pauseTimer}>Play</button>
      ) : (
        <button onClick={pauseTimer}>Pause</button>
      )}
      {resting && (
        <>
          <div>Break time! New session starts in: </div>
          <button onClick={skipBreak}> skip break </button>
        </>
      )}
      <br />
      <br />
      <div className="timer-wrapper">
        <div className="timer">
          {timerMinutes}:{timerSeconds}
        </div>
      </div>
      <br />
    </>
  )
}
