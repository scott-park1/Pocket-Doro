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
  direction: 'left' | 'right'
}

export default function Clouds() {
  const [cloudPositions, setCloudPositions] = useState<CloudPosition[]>([])

  useEffect(() => {
    const positions: CloudPosition[] = cloudImages.map(() => ({
      top: Math.random() * 90 + 25,
      left: Math.random() * 90 + 15,
      speed: Math.random() * 5 + 50,
      direction: Math.random() < 0.5 ? 'left' : 'right', // Set initial direction
    }))

    setCloudPositions(positions)
  }, [])

  return (
    <div className="clouds">
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
  )
}
