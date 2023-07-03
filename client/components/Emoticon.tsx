import React from 'react'
import { SpriteAnimator } from './sprites/SpriteAnimator'

const emoticonSheet = 'assets/CharacterSprites/emoticons.png'

interface Props {
  skippedBreaks: number
  resting: boolean
}

export default function Emoticon({ skippedBreaks, resting }: Props) {
  const spriteWidth = 16
  const spriteHeight = 16
  const scale = 1 / 5
  const frameCount = 6
  const wrapAfter = 5
  const fps = 0

  let startEmoticon = 5
  let onBreak = 14
  let study = 3
  let tired = 6 //skip 1 break
  let veryTired = 9 //skip 2 breaks
  let veryVeryTired = 13

  function emoticonCycle() {
    if (resting) return onBreak
    if (skippedBreaks === 0) return study
    if (skippedBreaks === 1) return tired
    if (skippedBreaks === 2) return veryTired
    if (skippedBreaks >= 3) return veryVeryTired
  }

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
        frame={emoticonCycle()}
      />
    </div>
  )
}
