import { useState, useEffect } from 'react'
import { SpriteAnimator } from './sprites/SpriteAnimator'

const walk = '/assets/CharacterSprites/characters/char1.png'
const clothes = '/assets/CharacterSprites/separate/walk/clothes/dress_walk.png'
const hair = '/assets/CharacterSprites/separate/walk/hair/spacebuns_walk.png'
const earrings =
  '/assets/CharacterSprites/separate/walk/acc/earring_red_silver_walk.png'
const shoes = '/assets/CharacterSprites/separate/walk/clothes/shoes_walk.png'

export default function Avatar() {
  const spriteWidth = 32
  const spriteHeight = 32
  const [scale, setScale] = useState(0.25)
  const frameCount = 8 // rows
  const wrapAfter = 8 // columns
  const fps = 0 // speed

  useEffect(() => {
    const handleResize = () => {
      const newScale = 350 / window.innerWidth
      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="avatar" style={{ imageRendering: 'pixelated' }}>
      <SpriteAnimator
        sprite={walk}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
      />
      <SpriteAnimator
        sprite={clothes}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={hair}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={earrings}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
      <SpriteAnimator
        sprite={shoes}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        className="clothes"
      />
    </div>
  )
}
