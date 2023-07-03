import Timer from './Timer'
import Avatar from './Avatar'
import Map from './Map'
import { useState, useEffect } from 'react'
import Switch from 'react-ios-switch'
import Emoticon from './Emoticon'

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
    setChecked(checked)
  }

  useEffect(() => {
    document.body.style.backgroundColor = checked
      ? 'black'
      : 'rgb(253, 198, 59)'
  }, [checked])

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
        pendingOffColor={undefined}
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
        <Emoticon skippedBreaks={skippedBreaks} resting={resting} />
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
