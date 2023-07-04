import { useState, useEffect, ChangeEvent } from 'react'
import Emoticon from './Emoticon'
// add import for play/pause icons

const alarmTone = new Audio('/alarm.mp3')

const playSound = () => {
  alarmTone.play()
}

interface Props {
  skippedBreaks: number
  onSkipBreak: () => void
  resting: boolean
  setResting: (value: React.SetStateAction<boolean>) => void
}

export default function Timer({
  skippedBreaks,
  onSkipBreak,
  resting,
  setResting,
}: Props) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [completedIntervals, setCompletedIntervals] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [workingLength, setWorkingLength] = useState(24)
  const [shortBreakLength, setShortBreakLength] = useState(4)
  const [longBreakLength, setLongBreakLength] = useState(2)
  const [showSettings, setShowSettings] = useState(false)
  const [totalWorkingTime, setTotalWorkingTime] = useState(0)

  function handleWorkingMinutesChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setWorkingLength(parseInt(value) - 1)
    // needs to reset the timer. at the moment it will only use value for the next interval
  }
  function handleLongBreakChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setLongBreakLength(parseInt(value) - 1)
  }
  function handleShortBreakChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setShortBreakLength(parseInt(value) - 1)
  }
  // All of these handleChange functions probably need to multiply the value by 60,
  // so the timer works in minutes, rather than seconds?

  function displaySettings() {
    setIsPaused(true)
    setShowSettings(!showSettings)
  }

  const changeTimer = () => {
    setResting(!resting)
    playSound()

    // something weird with boolean here

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
            if (resting) console.log('end of rest')
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
      if (!resting) setTotalWorkingTime(totalWorkingTime + 1)
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [
    seconds,
    changeTimer,
    completedIntervals,
    minutes,
    totalWorkingTime,
    setTotalWorkingTime,
  ])

  function skipBreak() {
    changeTimer()
    onSkipBreak()
    // setSkippingBreak(true)
  }

  function pauseTimer() {
    setIsPaused(!isPaused)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  const workingMinutes = Math.floor(totalWorkingTime / 60)
  const workingHours = Math.floor(workingMinutes / 60)

  function displayTimeSpentWorking() {
    if (workingMinutes < 10) {
      return `${workingHours}:0${workingMinutes}`
    }

    return `${workingHours}:${workingMinutes}`
  }

  //   if (workingMinutes > 100) {
  //     return `${workingHours} hours and ${workingMinutes - 100} minutes`
  //   }
  //   if (workingHours === 0) {
  //     return `${workingMinutes - 100} minutes`
  //   }
  //   return `${workingHours} hours and ${workingMinutes - 100} minutes`
  // }

  return (
    <>
      {resting ? (
        <>
          <p className="break">Break time! New session starts in:</p>
          <div className="timer">
            {timerMinutes}:{timerSeconds}
          </div>
          <p className="timertext">
            Completed work cycles: {completedIntervals} <br />
            Breaks skipped: {skippedBreaks} <br />
            Time spent working: {totalWorkingTime}
          </p>
          <button onClick={skipBreak} className="skipbutton">
            Skip Break
          </button>
        </>
      ) : (
        <>
          <div className="timer">
            {timerMinutes}:{timerSeconds}
          </div>
          <p className="timertext">
            Completed work cycles: {completedIntervals} <br />
            Breaks skipped: {skippedBreaks} <br />
            Time spent working: {totalWorkingTime}
          </p>
        </>
      )}
      <br />
      <p className="timertext"></p>
      <br />
      <div className="timer-buttons-wrapper">
        {!showSettings &&
          (isPaused ? (
            <button className="timer-button" onClick={pauseTimer}>
              Start
            </button>
          ) : (
            <button className="timer-button" onClick={pauseTimer}>
              Stop
            </button>
          ))}
        <button
          className="timer-button-close-settings"
          onClick={displaySettings}
        >
          {showSettings ? 'Close' : 'Settings'}
        </button>
      </div>
      <div>
        {showSettings && (
          <>
            <div className="settings-wrapper">
              <label
                className="settings-headers"
                htmlFor="short-break-settings"
              >
                Interval:
              </label>
              <input
                className="slider"
                type="range"
                id="working-minutes-settings"
                name="working-minutes"
                min="0"
                max="120"
                defaultValue={workingLength}
                step="5"
                onChange={handleWorkingMinutesChange}
              ></input>
              <br />
              <div className="settings-values">{workingLength + 1} minutes</div>
              <br />
              <label
                className="settings-headers"
                htmlFor="short-break-settings"
              >
                Short Break:
              </label>
              <input
                className="slider"
                type="range"
                id="short-break-settings"
                name="short-break"
                min="0"
                max="30"
                defaultValue={shortBreakLength}
                step="5"
                onChange={handleShortBreakChange}
              ></input>
              <br />
              <div className="settings-values">
                {shortBreakLength + 1} minutes
              </div>
              <br />
              <label className="settings-headers" htmlFor="long-break-settings">
                Long Break:
              </label>
              <input
                className="slider"
                type="range"
                id="long-break-settings"
                name="long-break"
                min="0"
                max="120"
                defaultValue={longBreakLength}
                step="5"
                onChange={handleLongBreakChange}
              ></input>
              <br />
              <div className="settings-values">
                {longBreakLength + 1} minutes
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
