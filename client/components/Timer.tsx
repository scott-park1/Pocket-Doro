import { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'

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
  const [isPaused, setIsPaused] = useState(true)

  // settings
  /// change values for: working time, shortBreak, longBreak
  ///

  const [workingLength, setWorkingLength] = useState(24)
  const [shortBreakLength, setShortBreakLength] = useState(4)
  const [longBreakLength, setLongBreakLength] = useState(29)
  const [showSettings, setShowSettings] = useState(false)

  function settings() {
    setWorkingLength(workingLength)
    setShortBreakLength(shortBreakLength)
    setLongBreakLength(longBreakLength)
  }

  function displaySettings() {
    setShowSettings(!showSettings)
  }

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
      <div>
        <button onClick={displaySettings}>
          {showSettings ? 'Close' : 'Settings'}
        </button>
        {showSettings && (
          <>
            <label>work minutes: {workingLength}:00</label>
            <ReactSlider
              value={workingLength}
              min={1}
              max={120}
              onChange={(newValue) => setWorkingLength(newValue)}
            />
            <label>short break minutes: {shortBreakLength}:00</label>
            <ReactSlider
              value={shortBreakLength}
              min={1}
              max={120}
              onChange={(newValue) => setShortBreakLength(newValue)}
            />
            <div>
              <input
                type="range"
                id="long-break-settings"
                name="long-break"
                min="0"
                max="120"
                value={longBreakLength}
                onChange={settings}
              ></input>
              <label htmlFor="long-break-settings">
                Long Break {longBreakLength}
              </label>
            </div>
            <div></div>
          </>
        )}
      </div>
    </>
  )
}
