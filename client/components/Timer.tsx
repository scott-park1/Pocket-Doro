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
  const [working, setWorking] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [skippingBreak, setSkippingBreak] = useState(false)

  // !resting use minutes working
  // resting use resting minutes

  const changeTimer = () => {
    setWorking(!working)

    if (working) {
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

  useEffect(() => {
    const interval = setInterval(() => {
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

  function skipBreak() {
    changeTimer()
    onSkipBreak()
    setSkippingBreak(true)
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
      <div className="timeBubble">
        {resting ? (
          <>
            <div className="break">Break time! New session starts in: </div>
            <div className="timer-wrapper">
              <div className="timersecond">
                {timerMinutes}:{timerSeconds}
              </div>
            </div>
            <button onClick={skipBreak} className="skipbutton">
              Skip break
            </button>
            <div className="timertextbreak">
              Completed work cycles: {completedCycles} <br />
              Breaks skipped: {skippedBreaks}
            </div>
          </>
        ) : (
          <>
            <div className="timer-wrapper">
              <div className="timerfirst">
                {timerMinutes}:{timerSeconds}
              </div>
            </div>
            <div className="timertext">
              Completed work cycles: {completedCycles} <br />
              Breaks skipped: {skippedBreaks}
            </div>
          </>
        )}
      </div>
    </>
  )
}
