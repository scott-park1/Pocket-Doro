import React from 'react'
import { SpriteAnimator } from './sprites/SpriteAnimator'
import { useState } from 'react'

const emoticonSheet = 'assets/CharacterSprites/emoticons.png'

interface Props {
  skippedBreaks: number
  resting: boolean
}

export default function Emoticon({ skippedBreaks, resting }: Props) {
  const [tiredLevel, setTiredLevel] = useState(0)

  const spriteWidth = 16
  const spriteHeight = 16
  const scale = 1 / 5
  const frameCount = 6
  const wrapAfter = 5
  const fps = 0

  // let startEmoticon = 5
  let onBreak = 14
  let study = 3
  let tired = 6 //skip 1 break
  let veryTired = 9 //skip 2 breaks
  let veryVeryTired = 13

  setTiredLevel(0)

  // function countTiredLevel() {
  //   if (resting) {tiredLevel === 0 }
  //   // if (skippedBreaks === 0)
  //   if (skippedBreaks === 1) tiredLevel + 1
  //   if (skippedBreaks === 2) tiredLevel + 1
  //   if (skippedBreaks >= 3) tiredLevel + 1
  // }

  // function emoticonCycle () {
  //   if (resting) return onBreak
  //   if (tiredLevel === 0) return study
  //   if (tiredLevel === 1) return tired
  //   if (tiredLevel === 2) return veryTired
  //   if (tiredLevel >= 3) return veryVeryTired
  // }

  function emoticonCycle() {
    if (resting) return onBreak
    if (skippedBreaks === 0) return study // start break =+ 1
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
