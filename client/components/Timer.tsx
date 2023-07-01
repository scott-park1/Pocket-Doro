import { useState, useEffect, ChangeEvent } from 'react'
// add import for play/pause icons

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
  const [completedIntervals, setCompletedIntervals] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  // settings
  /// change values for: working time, shortBreak, longBreak
  ///

  const [workingLength, setWorkingLength] = useState(24)
  const [shortBreakLength, setShortBreakLength] = useState(4)
  const [longBreakLength, setLongBreakLength] = useState(29)
  const [showSettings, setShowSettings] = useState(false)

  function handleWorkingMinutesChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setWorkingLength(parseInt(value) - 1)
    changeTimer()
  }
  function handleLongBreakChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setLongBreakLength(parseInt(value) - 1)
  }
  function handleShortBreakChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setShortBreakLength(parseInt(value) - 1)
  }

  function displaySettings() {
    setIsPaused(true)
    setShowSettings(!showSettings)
  }

  const changeTimer = () => {
    setResting(!resting)

    if (resting) {
      setMinutes(workingLength)
      setSeconds(59)
      return
    }

    if (completedIntervals > 2) {
      setMinutes(longBreakLength)
      setSeconds(59)
      return
    }

    setMinutes(shortBreakLength)
    setSeconds(59)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) {
        return
      }

      if (completedIntervals <= 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            changeTimer()
            setCompletedIntervals(completedIntervals + 1)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }

      if (completedIntervals > 2) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            changeTimer()
            setCompletedIntervals(0)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds, changeTimer, completedIntervals, minutes])

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
      {!showSettings &&
        (isPaused ? (
          <button onClick={pauseTimer}>Start </button>
        ) : (
          <button onClick={pauseTimer}>Stop</button>
        ))}

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
      <div>
        <button onClick={displaySettings}>
          {showSettings ? 'Close' : 'Settings'}
        </button>
        {showSettings && (
          <>
            <div>
              <label htmlFor="short-break-settings">
                Interval Length: {workingLength + 1}
              </label>
              <br />
              <input
                type="range"
                id="working-minutes-settings"
                name="working-minutes"
                min="0"
                max="120"
                defaultValue={workingLength}
                step="5"
                onChange={handleWorkingMinutesChange}
              ></input>
            </div>
            <div>
              <label htmlFor="short-break-settings">
                Short Break Length: {shortBreakLength + 1}
              </label>
              <br />
              <input
                type="range"
                id="short-break-settings"
                name="short-break"
                min="0"
                max="30"
                defaultValue={shortBreakLength}
                step="5"
                onChange={handleShortBreakChange}
              ></input>
            </div>
            <div>
              <label htmlFor="long-break-settings">
                Long Break Length: {shortBreakLength + 1}
              </label>
              <br />
              <input
                type="range"
                id="long-break-settings"
                name="long-break"
                min="0"
                max="120"
                defaultValue={longBreakLength}
                step="5"
                onChange={handleLongBreakChange}
              ></input>
            </div>
          </>
        )}
        <br />
      </div>
    </>
  )
}
