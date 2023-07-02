import React from 'react'
import { SpriteAnimator } from 'react-sprite-animator'

const emoticonSheet = 'assets/CharacterSprites/emoticons.png'

export default function Emoticon() {
  const spriteWidth = 16
  const spriteHeight = 16
  const scale = 1 / 5
  const frameCount = 6 // rows
  const wrapAfter = 5 // columns
  const fps = 0 // speed

  return (
    <div className="emoticonSheet" style={{ imageRendering: 'pixelated' }}>
      <SpriteAnimator
        sprite={emoticonSheet}
        width={spriteWidth}
        height={spriteHeight}
        scale={scale}
        frameCount={frameCount}
        wrapAfter={wrapAfter}
        fps={fps}
        shouldAnimate={true}
        direction="horizontal"
        frame={3}
      />
    </div>
  )
}
