import { useState, useEffect } from 'react'
import DayBackground from '../../images/DayBackground.png'
import NightBackground from '../../images/NightBackground.png'

interface MapProps {
  checked: boolean
}

export default function Map({ checked }: MapProps) {
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

  useEffect(() => {
    setBackgroundImage(checked ? NightBackground : DayBackground)
  }, [checked]) // Again, good usage of this.

  return (
    <img
      src={backgroundImage}
      alt={checked ? 'Night Map' : 'Day Map'}
      className="map"
    />
  )
}
