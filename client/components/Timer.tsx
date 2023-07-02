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
  const [skippingBreak, setSkippingBreak] = useState(false)

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
    setSkippingBreak(true)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
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
