import Timer from './Timer'
import Avatar from './Avatar'
import Map from './Map'
import { useState, useEffect } from 'react'
import Switch from 'react-ios-switch'
import Emoticon from './Emoticon'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function Start() {
  const [checked, setChecked] = useState(false)
  const [skippedBreaks, setSkippedBreaks] = useState(0)
  const [resting, setResting] = useState(false)

  function handleSetResting(value: React.SetStateAction<boolean>) {
    if (value && skippedBreaks > 0) {
      setSkippedBreaks(skippedBreaks - 1)
    }
    setResting(value)
  }

  function onSkipBreak() {
    setSkippedBreaks(skippedBreaks + 1)
    //change emoticon
  }

  const handleSwitchChange = (checked: any) => {
    // Does this need to be "any" or could it be a boolean?
    setChecked(checked)
  }

  useEffect(() => {
    document.body.style.backgroundColor = checked ? '#293241 ' : '#F6C12D'
  }, [checked]) // good use of useEffect dependencies

  return (
    <>
      <Switch
        checked={checked}
        className="my-switch"
        disabled={false}
        handleColor="white"
        name="mySwitch"
        offColor="white"
        onChange={handleSwitchChange}
        onColor="rgb(76, 217, 100)"
        pendingOffColor={undefined} // For these undefined props, I wonder if they can be omitted entirely?
        pendingOnColor={undefined}
        readOnly={false}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 99,
          margin: '50px 30px 0px 0px',
        }}
      />
      <div className="flex-container">
        <div className="avatar-overlay">
          <Avatar />
        </div>
        <Map checked={checked} />
        <div className="emoticon-overlay">
          <Emoticon skippedBreaks={skippedBreaks} resting={resting} />
        </div>
        <div className="taskBubble">
          <TaskList />
        </div>
        <div className="timeBubble">
          <Timer
            skippedBreaks={skippedBreaks}
            onSkipBreak={onSkipBreak}
            resting={resting}
            setResting={handleSetResting}
          />
        </div>
      </div>
    </>
  )
}

export default Start
