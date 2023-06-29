import React, { useState, useEffect } from 'react'
import DayBackground from '../../images/DayBackground.png'
import NightBackground from '../../images/NightBackground.png'

export default function Map() {
  const [backgroundImage, setBackgroundImage] = useState(DayBackground)

  useEffect(() => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    const startDayHour = 6
    const endDayHour = 18

    if (currentHour >= startDayHour && currentHour < endDayHour) {
      setBackgroundImage(DayBackground)
    } else {
      setBackgroundImage(NightBackground)
    }
  }, [])

  return <img src={backgroundImage} alt="Day Map" />
}
