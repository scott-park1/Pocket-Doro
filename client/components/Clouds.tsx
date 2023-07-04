import { useState, useEffect } from 'react'

const cloudImages = [
  '/assets/clouds/cloudOne.png',
  '/assets/clouds/cloudTwo.png',
  '/assets/clouds/cloudThree.png',
  '/assets/clouds/cloudFour.png',
  '/assets/clouds/cloudFive.png',
  '/assets/clouds/cloudSix.png',
  '/assets/clouds/cloudSeven.png',
  '/assets/clouds/cloudEight.png',
  '/assets/clouds/cloudNine.png',
  '/assets/clouds/cloudTen.png',
  '/assets/clouds/cloudEleven.png',
  '/assets/clouds/cloudTwelve.png',
  '/assets/clouds/cloudThirteen.png',
  '/assets/clouds/cloudFourteen.png',
  '/assets/clouds/cloudFifteen.png',
  '/assets/clouds/cloudSixteen.png',
  '/assets/clouds/cloudSeventeen.png',
  '/assets/clouds/cloudEighteen.png',
  '/assets/clouds/cloudOne.png',
  '/assets/clouds/cloudTwo.png',
  '/assets/clouds/cloudThree.png',
  '/assets/clouds/cloudFour.png',
  '/assets/clouds/cloudFive.png',
  '/assets/clouds/cloudSix.png',
  '/assets/clouds/cloudSeven.png',
  '/assets/clouds/cloudEight.png',
  '/assets/clouds/cloudNine.png',
  '/assets/clouds/cloudTen.png',
  '/assets/clouds/cloudEleven.png',
  '/assets/clouds/cloudTwelve.png',
  '/assets/clouds/cloudThirteen.png',
  '/assets/clouds/cloudFourteen.png',
  '/assets/clouds/cloudFifteen.png',
  '/assets/clouds/cloudSixteen.png',
  '/assets/clouds/cloudSeventeen.png',
  '/assets/clouds/cloudEighteen.png',
]

interface CloudPosition {
  top: number
  left: number
  speed: number
  scale: number
}

export default function Clouds() {
  const [cloudPositions, setCloudPositions] = useState<CloudPosition[]>([])

  useEffect(() => {
    const positions: CloudPosition[] = cloudImages.map(() => {
      const left = Math.random() * -50

      return {
        top: Math.random() * 90 + 25,
        left,
        speed: Math.random() * 0.05 + 0.01,
        scale: Math.random() + 1,
      }
    })

    setCloudPositions(positions)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCloudPositions((positions) =>
        positions.map((position) => {
          let newLeft = position.left + position.speed
          if (newLeft > 105) newLeft = Math.random() * -50

          return {
            ...position,
            left: newLeft,
          }
        })
      )
    }, 1000 / 60)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="clouds">
      <div className="cloud-container">
        {cloudImages.map((cloudImage, index) => (
          <img
            key={index}
            src={cloudImage}
            alt={`cloud-${index + 1}`}
            className={`cloud-${index % 2 === 0 ? 'left' : 'right'}`}
            style={{
              top: `${cloudPositions[index]?.top}vh`,
              left: `${cloudPositions[index]?.left}%`,
              animationDuration: `${cloudPositions[index]?.speed}s`,
              imageRendering: 'pixelated',
            }}
          />
        ))}
      </div>
    </div>
  )
}
