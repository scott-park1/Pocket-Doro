import { useState, useEffect, useCallback } from 'react'
import { updateTimerSettings, getTimerSettings } from '../apis/timer-settings'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
const alarmTone = new Audio('/alarm.mp3')

const playSound = () => {
  alarmTone.play()
}

const initialData = {
  intervalLength: 24,
  shortBreakLength: 4,
  longBreakLength: 29,
}

interface Props {
  skippedBreaks: number
  onSkipBreak: () => void
  resting: boolean
  setResting: (value: React.SetStateAction<boolean>) => void
  // i don't think we actually need id column in db?
  id: number
  intervalLength: number
  shortBreakLength: number
  longBreakLength: number
}

export default function Timer({
  skippedBreaks,
  onSkipBreak,
  resting,
  setResting,
}: Props) {
  //minutes should be interval length from db? then base seconds of that?
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  const [completedIntervals, setCompletedIntervals] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  // const [workingLength, setWorkingLength] = useState(24)
  // const [shortBreakLength, setShortBreakLength] = useState(4)
  // const [longBreakLength, setLongBreakLength] = useState(29)
  const [showSettings, setShowSettings] = useState(false)
  const [totalWorkingTime, setTotalWorkingTime] = useState(0)

  const [shortBreakInput, setShortBreakInput] = useState(4)
  const [longBreakInput, setLongBreakInput] = useState(29)
  const [intervalInput, setIntervalInput] = useState(24)

  const queryClient = useQueryClient()

  const updateTimerSettingsMutation = useMutation(updateTimerSettings, {
    onSuccess: async () => [queryClient.invalidateQueries(['timer'])],
  })

  const {
    data: timerSettings,
    isError,
    isLoading,
  } = useQuery(['timer'], getTimerSettings)
  // use either placeholderData or initialData?

  const intervalLength =
    timerSettings?.interval_length || initialData.intervalLength
  const shortBreakLength =
    timerSettings?.short_break_length || initialData.shortBreakLength
  const longBreakLength =
    timerSettings?.long_break_length || initialData.longBreakLength

  const handleUpdateSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateTimerSettingsMutation.mutate({
      timerSettings: {
        interval_length: intervalInput,
        short_break_length: shortBreakInput,
        long_break_length: longBreakInput,
      },
      token: '', // do something here? wrap settings in Auth component? make separate settings component then pass props?
    })
  }

  function displaySettings() {
    setIsPaused(true)
    setShowSettings(!showSettings)
  }

  const changeTimer = useCallback(() => {
    setResting(!resting)
    playSound()

    if (resting) {
      setMinutes(intervalLength)
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
  }, [
    setResting,
    resting,
    completedIntervals,
    shortBreakLength,
    intervalLength,
    longBreakLength,
  ])

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
    }, 1000)

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
    isPaused,
    resting,
  ])

  function skipBreak() {
    changeTimer()
    onSkipBreak()
  }

  function pauseTimer() {
    setIsPaused(!isPaused)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  // bug here with total minnuts exceeding 60
  // also should we store this in the db? bad performance because saving data every second/minute?

  const workingMinutes = Math.floor(totalWorkingTime / 60)
  const workingHours = Math.floor(workingMinutes / 60)

  function displayTimeSpentWorking() {
    if (workingMinutes < 10) {
      return `${workingHours}:0${workingMinutes}`
    }

    return `${workingHours}:${workingMinutes}`
  }

  // if !timer data use 25, 5, 30 so it still works? make it work for not being logged in too?
  if (isError) {
    return <div>Sorry! There was an error while trying to load the timer</div>
  }

  if (isLoading) {
    return <div> Loading timer...</div>
  }

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
            Skip break
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
            <form>
              <div className="settings-wrapper">
                <label
                  className="settings-headers"
                  htmlFor="short-break-settings"
                >
                  Interval:
                </label>
                <input
                  aria-label="edit interval length"
                  className="slider"
                  type="range"
                  name="working-minutes"
                  min="0"
                  max="120"
                  defaultValue={intervalLength}
                  step="5"
                  onChange={(e) => {
                    setIntervalInput(Number(e.target.value))
                  }}
                ></input>
                <br />
                <div className="settings-values">
                  {intervalLength + 1} minutes
                </div>
                <br />
                <label
                  className="settings-headers"
                  htmlFor="short-break-settings"
                >
                  Short Break:
                </label>
                <input
                  aria-label="edit short break length"
                  className="slider"
                  type="range"
                  name="short-break"
                  min="0"
                  max="30"
                  defaultValue={shortBreakLength}
                  step="5"
                  onChange={(e) => {
                    setShortBreakInput(Number(e.target.value))
                  }}
                ></input>
                <br />
                <div className="settings-values">
                  {shortBreakLength + 1} minutes
                </div>
                <br />
                <label
                  className="settings-headers"
                  htmlFor="long-break-settings"
                >
                  Long Break:
                </label>
                <input
                  aria-label="edit long break length"
                  className="slider"
                  type="range"
                  name="long-break"
                  min="0"
                  max="120"
                  defaultValue={longBreakLength}
                  step="5"
                  onChange={(e) => {
                    setLongBreakInput(Number(e.target.value))
                  }}
                ></input>
                <br />
                <div className="settings-values">
                  {longBreakLength + 1} minutes
                </div>
              </div>
              <button onSubmit={handleUpdateSubmit}>save changes</button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
